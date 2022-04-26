// SPDX-License-Identifier: GPL-3.0
//The pragma command means "additional information that only the compiler cares about", 
//while the caret symbol (^) means "the version indicated or higher".
pragma solidity ^0.8.0;
//practice for using the openzeppelin lib https://docs.openzeppelin.com/learn/developing-smart-contracts
//is Context import "@openzeppelin/contracts/GSN/Context.sol";


contract BaseWarrantySmartContract {
    struct Party { 
        //a struct representing both the contractor and client
        string name; 
        address partyAddress;
        Location physicalLocation;
        ContactInformation contactInfo;
    }
    struct Location {
        //a struct for full addresses
        string streetAddressLine1;
        string streetAddressLine2;
        string city;
        string state;
        string postalCode;
    }
    struct ContactInformation {
        //a struct for a party's contact info
        string email;
        string phoneMobile;
        string phoneHome;
    }
    Party public warrantyHolder;    //the client
    Party public  warrantyProvider; //the contractor
    Party[] previousHolders;
    string public projectName;
    bool public isTransferable;
    Location public locationOfWork;
    uint public immutable dateOfWorkCompletion; // in seconds since 1970
    uint public immutable warrantyExpirationDate;//seconds since unix epoch
    bool public immutable warrantyExpires;
    uint public immutable numberOfDaysToCorrect;//•	Number of days contractor has to correct defective work before paying charges
    string public descriptionOfProject;
    uint256 public immutable warrantyStartDate;
    enum WarrantyState { INACTIVE, ACTIVE, VOID }
    WarrantyState public stateOfWarranty;
    event CurrentHolderChanged(Party _newOwner);
    event WarrantyVoided(string _message);

    constructor(uint _warrantyExpirationDate, //date in seconds past epoch
                bool _warrantyExpires,
                uint _numberOfDaysToCorrect,
                uint _workCompleted, //date in seconds past epoch
                string memory _projectName,
                string memory _description,
                bool _transferable,
                Party memory _warrantyProvider,
                Party memory _warrantyHolder,
                Location memory _location
    ) {
        dateOfWorkCompletion = _workCompleted;
        warrantyStartDate = block.timestamp;
        warrantyExpires = _warrantyExpires;
        warrantyExpirationDate = _warrantyExpirationDate;
        stateOfWarranty = WarrantyState.ACTIVE;
        numberOfDaysToCorrect = _numberOfDaysToCorrect;
        projectName = _projectName;
        descriptionOfProject = _description;
        warrantyProvider = _warrantyProvider;
        warrantyHolder = _warrantyHolder;
        locationOfWork = _location;
        isTransferable = _transferable;
    }

    modifier mustBeActive() {
        require(
            stateOfWarranty == WarrantyState.ACTIVE,
            "This function may only be used if the contract is active"
        );
        _;
    }

    function voidWarranty() public mustBeActive {
        stateOfWarranty = WarrantyState.VOID;
        emit WarrantyVoided(string(abi.encodePacked("The warranty for the ", projectName, " at ", getLocationAsString(), " has been voided")));
    }

    function checkIfExpired() public view returns(bool) {
        uint currentTime = block.timestamp;
        if (warrantyExpires) {
            if (currentTime > warrantyExpirationDate) {
                return true;
            }        
        }
        return false;
    }

    function getDaysUntilExpiration() public view returns(uint) {
        //view =  the function only reads the state
        bool isExpired = checkIfExpired();
        if (isExpired) {
            return 0;
        }
        else {
            uint currentTime = block.timestamp;
            return convertSecondsToDays(warrantyExpirationDate - currentTime);
        }
    }

    function convertSecondsToDays(uint secondsToConvert) internal pure returns(uint) {
        //internal the contract and its derivatives can call the function
        //pure: the function neither reads nor writes to the state
        uint day = 1 days;//amount of seconds in a day
        return secondsToConvert/day;
    }

    function getLocationAsString() public view returns (string memory) {
        return string(abi.encodePacked(locationOfWork.streetAddressLine1, " ",
        locationOfWork.streetAddressLine2, " ",
        locationOfWork.city, ", ",
        locationOfWork.state, " ",
        locationOfWork.postalCode));
    }

    modifier holderOnly() {
    require(
      msg.sender == warrantyHolder.partyAddress,
      "This function is restricted to the contract's holder"
    );
    _;
  }

    modifier providerOnly() {
    require(
      msg.sender == warrantyProvider.partyAddress,
      "This function is restricted to the warranty's provider"
    );
    _;
  }
    function transferWarrantyToAnotherParty(Party memory newParty)
    external holderOnly {
        //external =  anyone but the contract can call the function. Using the external type instead of public can have a performance boost and potentially save a lot of gas
        //require(msg.sender == warrantyProvider.partyAddress);//should require the by party's permission
        if (isTransferable){
            previousHolders.push(warrantyHolder);
            warrantyHolder = newParty; 
            emit CurrentHolderChanged(newParty);
        }
    }

    function getPreviousHolders() 
    external view providerOnly 
    returns (Party[] memory) {
        //external =  anyone but the contract can call the function. Using the external type instead of public can have a performance boost and potentially save a lot of gas
        //require(msg.sender == warrantyProvider.partyAddress);//should require the by party's permission
        return previousHolders;
    }
}
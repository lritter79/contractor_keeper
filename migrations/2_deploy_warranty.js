const Warranty = artifacts.require("BaseWarrantySmartContract");
const addressPlaceHolder = require("../address-placeholder");

module.exports = function(deployer) {
    console.log(addressPlaceHolder);
    //everything after warranty is an 
    //argument for the smart contract's constructor
    deployer.deploy(Warranty,
        1648551148,      //uint _warrantyExpirationDate, //date in seconds past epoch
        3,        //uint _numberOfDaysToCorrect,
        1648501148,        //uint _workCompleted, //date in seconds past epoch
        "Test",        //string memory _projectName,
        "A test",        //string memory _description,
        true,       //bool _transferable
        {
            name: "The Stine Family", 
            partyAddress: addressPlaceHolder.ADDRESS,
            physicalLocation: {
                streetAddressLine1:'123 Fake Street',
            streetAddressLine2:'',
            city: 'PitBurgh',
            state: 'PA',
            postalCode: "77777"
            },
            contactInfo:{
                email: "fakeemail@gmail.com",
                phoneMobile: "4022931029",
                phoneHome:""
    
            } 
        },      //Party memory _warrantyProvider,
        {
            name: "The Stine Contracting Co.", 
            partyAddress: addressPlaceHolder.ADDRESS,
            physicalLocation: {
                streetAddressLine1:'123 Fake Street',
            streetAddressLine2:'',
            city: 'PitBurgh',
            state: 'PA',
            postalCode: "77777"
            },
            contactInfo:{
                email: "fakeemail@gmail.com",
                phoneMobile: "4022931029",
                phoneHome:""
    
            } 
        },        //Party memory _warrantyHolder,
        {
            streetAddressLine1:'123 Fake Street',
            streetAddressLine2:'',
            city: 'PitBurgh',
            state: 'PA',
            postalCode: "77777"
        },        //Location memory _location
    );
};
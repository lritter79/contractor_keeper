const { assert } = require("console");
const addressPlaceHolder = require("../address-placeholder");

const Warranty = artifacts.require("BaseWarrantySmartContract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("BaseWarrantySmartContract", 
  function (accounts) 
  {
    let warranty;
    const assert = require('chai').assert;

    beforeEach(async () => {
      warranty = await Warranty.deployed();
    });
/* 
    it("should assert true", async function () {
      return assert.isTrue(true);
    }); */

    describe("get is expired", async function(){
      it("should return true", async function(){
          const isExpired = await warranty.checkIfExpired();
          assert.isTrue(isExpired, "deployed warranty should be expired");
      });
    }); 

    describe("work completed date", async function(){
      it("work completed should be what was put in the constructor", async function(){
          const dateOfWorkCompletion = await warranty.dateOfWorkCompletion();
          //assert.isNumber(dateOfWorkCompletion, "returns a number");
          console.log(`dateOfWorkCompletion: ${dateOfWorkCompletion}`);
          assert.equal(dateOfWorkCompletion, 1648501148, "equals what would go in the constructor")

      });
    }); 

    describe("expir date", async function(){
      it("expir should be what was put in the constructor", async function(){
          const dateOfExpir = await warranty.warrantyExpirationDate();
          //assert.isNumber(dateOfExpir, "returned dateOfExpir");
          assert.equal(dateOfExpir, 1648551148, `equals what would go in the constructor: ${dateOfExpir.toString()}`)

      });
    }); 

    describe("warrantyStartDate should not be 0", async function(){
      it("should be greater than 0", async function(){
          const warrantyStartDate = await warranty.warrantyStartDate();
          console.log(`warrantyStartDate: ${warrantyStartDate}`);

          //assert.isNumber(dateOfExpir, "returned dateOfExpir");
          assert.notEqual(warrantyStartDate, 0, `warranty start date is 0`)

      });
    }); 
/*     describe("should convert 86400 seconds to one day", async function(){
      it("should be greater than 0", async function(){
          const days = await warranty.convertSecondsToDays(86400);
          console.log(`days: ${days}`);

          //assert.isNumber(dateOfExpir, "returned dateOfExpir");
          assert.equal(days, 1, `days doesnt equal 1`)

      });
    });  */
    describe("should be able to transfer warranty", async function(){
      it("should transfer", async function(){
          console.log(addressPlaceHolder);
          const oldHolder = await warranty.warrantyHolder();
          await warranty.transferWarrantyToAnotherParty({
            name: "The Stein Contracting Co.", 
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
          });
          const newHolder = await warranty.warrantyHolder();
          const previousHolders = await warranty.getPreviousHolders();
          console.log(`old: ${JSON.stringify(oldHolder)}`);
          console.log(`new: ${JSON.stringify(newHolder)}`);
          console.log(`previous holders: ${previousHolders}`);
          //assert.isNumber(dateOfExpir, "returned dateOfExpir");
          assert.notEqual(oldHolder.name, newHolder.name, `names should be different`)
          assert.equal(previousHolders.length, 1, 'previous holders should have one in it');
      });
    }); 
  }
);

import React, {useState, useCallback} from "react";
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { Form as AntdForm, Input, Button, Radio, Steps, message } from 'antd';
import HolderForm from "./Forms/HolderForm";
import ProviderForm from "./Forms/ProviderForm"
import WarrantyDetailsForm from "./Forms/WarrantyDetailsForm";
import { useStepsForm } from 'sunflower-antd';
import { deployWarranty } from "../../eth/warrantyDeploy";
import useLocalStorage from "../../customHooks/useLocalStorage";


const WarrantyScreen = () => {
    const { Step } = Steps;
    const addressPlaceHolder = Object.freeze({
        HOLDER_ADDRESS: '0x630aB4E818Bd0c1ADAF690aDC3703A49D6D7f07E',
        PROVIDER_ADDRESS: '0x630aB4E818Bd0c1ADAF690aDC3703A49D6D7f07E',
        TRANSFER_ADDRESS: '0x630aB4E818Bd0c1ADAF690aDC3703A49D6D7f07E'
    });
    const [address, setAddress] = useLocalStorage("contractAddress", null)
    const {
        form,
        current,
        gotoStep,
        stepsProps,
        formProps,
        submit,
        formLoading,
      } = useStepsForm({
        async submit (values) {
          console.log(values);
          let arr = shapeData(values);
          let address = await deployWarranty(arr)
          setAddress(address)
          //await new Promise(r => setTimeout(r, 1000));
          return 'ok';
        },
        defaultCurrent:0, 
        isBackValidate:false, 
        total:4});

    const formList = [
        <>      
            <HolderForm form={form} />
        </>,  
        <>
            <ProviderForm form={form}/>
        </>
        ,
        <WarrantyDetailsForm form={form}/>,
        <div>
            Complete!
            See your contract at {address}
        </div>
    ]

    function shapeData(formOutput) {
        /* let params = [];
        params.push(formOutput.expirationDate.unix());// uint _warrantyExpirationDate, //date in seconds past epoch
        params.push(formOutput.warrantyExpires);// bool _warrantyExpires,
        params.push(formOutput.daysToCorrect);// uint _numberOfDaysToCorrect,
        params.push(formOutput.dateOfWorkCompletion.unix());// uint _workCompleted, //date in seconds past epoch
        params.push(formOutput.projectName);// string memory _projectName,
        params.push(formOutput.descriptionOfProject);// string memory _description,
        params.push(formOutput.isTransferable);// bool _transferable,
        params.push(formOutput.provider);// Party memory _warrantyProvider,
        params.push(formOutput.holder);// Party memory _warrantyHolder,
        params.push(formOutput.useHolderAddress ? formOutput.holder.location : formOutput.location);// Location memory _location */
        let params =[
            1648551148,      //uint _warrantyExpirationDate, //date in seconds past epoch
            true, //_warrantyExpires
            3,        //uint _numberOfDaysToCorrect,
            1648501148,        //uint _workCompleted, //date in seconds past epoch
            "Test",        //string memory _projectName,
            "A test",        //string memory _description,
            true,       //bool _transferable
            {
                name: "The Stine Family", 
                partyAddress: addressPlaceHolder.PROVIDER_ADDRESS,
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
                partyAddress: addressPlaceHolder.HOLDER_ADDRESS,
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
        ]
        return params;
    }
    
    const next = () => {
        gotoStep(current + 1)
        window.scroll({top:0,behavior:'smooth'})
    };
    const prev = () => {
        gotoStep(current - 1)
        window.scroll({top:0,behavior:'smooth'})
    };

    const submitWarranty = async function(){
        submit().then(result => {
            if (result === 'ok') {
                message.success('Processing complete!');

              gotoStep(current + 1);
            }
          });
    }

    return (
        <div>  
                    
                <Steps labelPlacement="horizontal" responsive="true" current={current}>
                    <Step title="Holder Information" />
                    <Step title="Provider Information" />
                    <Step title="Warranty Details" />
                    <Step title="Complete" />
                </Steps>
            

            {/* 
                Form section
            */}
            <AntdForm 
                size="small"
                form={form}
                layout='vertical'
            >
                {formList[current]}
                    <AntdForm.Item> 
                        {(current > 0 && current < 3) && (
                            <Button  style={{ marginRight: 10 }} onClick={() => prev()}>
                                Previous
                            </Button>
                        )}
                        {current < 2  && (
                            <Button type="primary" onClick={() => next()}>
                                Next
                            </Button>
                        )}
                        {current === 2  && (
                            <Button 
                                type="primary" 
                                onClick={() => submitWarranty()}
                            >
                                Finish
                            </Button>
                        )}
                    </AntdForm.Item>
                
            </AntdForm>      
        </div>
    );
}
 
export default WarrantyScreen;
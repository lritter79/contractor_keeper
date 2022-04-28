import React, {useState, useCallback} from "react";
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { Form as AntdForm, Input, Button, Radio, Steps, message, Result, Progress, Modal, Spin } from 'antd';
import HolderForm from "./Forms/HolderForm";
import ProviderForm from "./Forms/ProviderForm"
import WarrantyDetailsForm from "./Forms/WarrantyDetailsForm";
import { useStepsForm } from 'sunflower-antd';
import { deployWarranty } from "../../eth/warrantyDeploy";
import useLocalStorage from "../../customHooks/useLocalStorage";


const WarrantyForm = () => {
    const { Step } = Steps;
    const addressPlaceHolder = Object.freeze({
        HOLDER_ADDRESS: '0x630aB4E818Bd0c1ADAF690aDC3703A49D6D7f07E',
        PROVIDER_ADDRESS: '0x630aB4E818Bd0c1ADAF690aDC3703A49D6D7f07E',
        TRANSFER_ADDRESS: '0x630aB4E818Bd0c1ADAF690aDC3703A49D6D7f07E'
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [address, setAddress] = useLocalStorage("contractAddress", null)
    const statusArr =['success', 'exception', 'active']
    const [status, setStatus] = useState(2)
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
        setIsModalVisible(true)
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
            <Result
                status="success"
                title="Successfully Created a Smart Warranty"
                subTitle=""
                extra={[
                    <p style={{wordBreak: 'break-all'}}>           
                        See your contract at <a href={`https://etherscan.io/address/${address}`}>{address}</a>
                    </p>
                ]}
            />
        </div>
        
    ]

    function shapeData(formOutput) {
        let params = [
            formOutput.expirationDate.unix(),
            formOutput.warrantyExpires,
            formOutput.daysToCorrect,
            formOutput.dateOfWorkCompletion.unix(),
            formOutput.projectName,
            formOutput.descriptionOfProject,
            formOutput.isTransferable,
            formOutput.provider,
            formOutput.holder,
            formOutput.useHolderAddress ? formOutput.holder.physicalLocation : formOutput.location,
        ];

        let params2 =[
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
        console.log(params);
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

    const submitWarranty = async function() {
        submit()
        .then(result => {
            if (result === 'ok') {
                message.success('Processing complete!');
                setStatus(0)
              gotoStep(current + 1);
            }
        })
        .catch(err => {
            message.error("Something went wrong");
            setStatus(1);
        })
        .finally(()=> setIsModalVisible(false));
    }

    return (
    <>
        <Modal
            title="Saving to blockchain..."
            visible={isModalVisible}
            closable='false'
            footer={null}
        >
            <p>Use MetaMask to accept the transaction</p>
            <Spin />
        </Modal>
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
            <div style={{ width: 170, margin:'0 auto' }}>
                <Progress percent={(current + 1) * 25} status={statusArr[status]} />
            </div>    
        </div>
    </>
    );
}
 
export default WarrantyForm;
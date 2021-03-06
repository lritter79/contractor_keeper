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
import getWeb3 from "../../eth/web3";


const WarrantyForm = () => {
    const { Step } = Steps;

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
          try {
            console.log(values);
            let arr = shapeData(values);
            let web3 = await getWeb3()
            if (!web3){
                throw "No web3 provider found"
            }
            let address = await deployWarranty(arr, web3)
            setAddress(address)
            //await new Promise(r => setTimeout(r, 1000));
            return 'ok';
          } catch(err){
            return err
          }
          
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
            else {
                throw result
            }
        })
        .catch(err => {
            message.error(`Something went wrong:  ${err}`, 10);
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
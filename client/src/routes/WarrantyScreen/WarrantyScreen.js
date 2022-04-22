import React, {useState, useCallback} from "react";
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { Form as AntdForm, Input, Button, Radio, Steps, message } from 'antd';
import HolderForm from "./Forms/HolderForm";
import ProviderForm from "./Forms/ProviderForm"
import WarrantyDetailsForm from "./Forms/WarrantyDetailsForm";
import { useStepsForm } from 'sunflower-antd';
import { deployWarranty } from "../../eth/warrantyDeploy";

const WarrantyScreen = () => {
    const { Step } = Steps;
    const [address, setAddress] = useState(null)
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
          let arr = [];
          Object.keys(values).forEach(key => {
            let value = values[key];
            arr.push(value);
          });
          await deployWarranty(arr)
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
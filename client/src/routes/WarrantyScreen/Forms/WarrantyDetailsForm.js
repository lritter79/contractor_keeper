import React from 'react';
import { Form as AntdForm, Input, Radio, DatePicker, InputNumber, Switch } from 'antd';
import moment from 'moment';
const { Group, Button } = Radio;

const WarrantyDetailsForm = ({form}) => {
    
    const onFill = () => {
        form.setFieldsValue({
            projectName:"Interior French Drain",
            isTransferable:true,
            useHolderAddress:true,
            dateOfWorkCompletion:moment(new Date()),
            warrantyExpires: true,
            expirationDate:moment(new Date('12/12/2112')),
            daysToCorrect: 100,
            descriptionOfProject: "A big one",
            startDate:moment(new Date()),
            location:null
        });
        window.scroll({top:1000, behavior:'smooth'})
    };
    return (  
    <>  
        <AntdForm.Item>                               
                    <Button type="link" htmlType="button" onClick={onFill}>
                        Fill form
                    </Button>
        </AntdForm.Item>
        <AntdForm.Item label="Project Name" name="projectName">
            <Input placeholder="" />
        </AntdForm.Item>
        <AntdForm.Item label="Is This Warranty Transferable?" name="isTransferable" valuePropName="checked">
            <Switch defaultChecked checkedChildren="Yes" unCheckedChildren="No" />
        </AntdForm.Item>
        <div>
            <h2>Location of Work</h2>
            <AntdForm.Item label="Use Holder Address?" name="useHolderAddress" valuePropName="checked">
                <Switch defaultChecked checkedChildren="Yes" unCheckedChildren="No" />
            </AntdForm.Item>
            <AntdForm.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.useHolderAddress !== currentValues.useHolderAddress}
            >
                {
                    ({ getFieldValue }) =>
                    getFieldValue('useHolderAddress') == false ? (
                    <>
                    <AntdForm.Item label="Street Address Line 1" name={['location','addressLine1']}>
                    <Input placeholder="" />
                </AntdForm.Item>  
                <AntdForm.Item label="Street Address Line 2" name={['provider','location','addressLine2']}>
                    <Input placeholder="" />
                </AntdForm.Item> 
                <AntdForm.Item label="City" name={['location','city']}>
                    <Input placeholder="" />
                </AntdForm.Item>       
                <AntdForm.Item label="State" name={['location','state']}>
                    <Input placeholder="" />
                </AntdForm.Item>      
                <AntdForm.Item label="ZIP Code" name={['location','zip']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                    </>
                    ) : null         
                }
            </AntdForm.Item>
                                
        </div>
        <AntdForm.Item label="Date Of Work Completion" name="dateOfWorkCompletion">
            <DatePicker />
        </AntdForm.Item>
        <AntdForm.Item label="Does This Warranty Expire?" name="warrantyExpires">
            <Radio.Group>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
            </Radio.Group>
        </AntdForm.Item>
        <AntdForm.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.warrantyExpires !== currentValues.warrantyExpires}
        >
        {
            ({ getFieldValue }) =>
            getFieldValue('warrantyExpires') == true ? (
            <AntdForm.Item label="Warranty Expiration Date" name="expirationDate">
                <DatePicker />
            </AntdForm.Item>
            ) : null         
        }
        </AntdForm.Item>
        <AntdForm.Item label="Number Of Days To Correct" name="daysToCorrect">
            <InputNumber />
        </AntdForm.Item>
        <AntdForm.Item label="Description Of Project" name="descriptionOfProject">
            <Input.TextArea>
            </Input.TextArea>
        </AntdForm.Item>
        <AntdForm.Item label="Warranty Start Date" name="startDate">
            <DatePicker />
        </AntdForm.Item>
    </> 
    );
}
 
export default WarrantyDetailsForm;
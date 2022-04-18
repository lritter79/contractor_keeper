import React from 'react';
import { Form as AntdForm, Input, Button } from 'antd';

const HolderForm = ({form}) => {
    const onFill = () => {
        form.setFieldsValue({
            holder: {
                name: 'Suzy and Bob Weiss', 
                walletAddress: '0x0',
                location:{
                    addressLine1:"123 Fake Street",
                    addressLine2: null,
                    city: "Rittsburgh",
                    state: "PA",
                    zip:'69420',
                },
                contactInformation: {
                    email:'fake@notreal.com',
                    mobilePhone: '2022002000',
                    workPhone:null
                }
            },
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
                <AntdForm.Item 
                    label="Holder Name"
                    name={['holder', 'name']}
                >
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Holder Wallet Address" name={['holder','walletAddress']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Holder Street Address Line 1" name={['holder','location','addressLine1']}>
                    <Input placeholder="" />
                </AntdForm.Item>  
                <AntdForm.Item label="Holder Street Address Line 2" name={['holder','location','addressLine2']}>
                    <Input placeholder="" />
                </AntdForm.Item> 
                <AntdForm.Item label="Holder City" name={['holder','location','city']}>
                    <Input placeholder="" />
                </AntdForm.Item>       
                <AntdForm.Item label="Holder State" name={['holder','location','state']}>
                    <Input placeholder="" />
                </AntdForm.Item>      
                <AntdForm.Item label="Holder ZIP Code" name={['holder','location','zip']}>
                    <Input placeholder="" />
                </AntdForm.Item>        
                <AntdForm.Item label="Holder Email" name={['holder','contactInformation','email']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Holder Phone - Mobile" name={['holder','contactInformation','mobilePhone']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Holder Phone - Home" name={['holder','contactInformation','workPhone']}>
                    <Input placeholder="" />
                </AntdForm.Item>

        </>
     );
}
 
export default HolderForm;
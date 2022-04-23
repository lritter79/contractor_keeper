import React from 'react';
import { Form as AntdForm, Input, Button } from 'antd';

const HolderForm = ({form}) => {
    const onFill = () => {
        form.setFieldsValue({
            holder: {
                name: 'Suzy and Bob Weiss', 
                partyAddress: '0x0000000000000000000000000000000000000000',
                physicalLocation:{
                    streetAddressLine1:"123 Fake Street",
                    streetAddressLine2: '',
                    city: "Rittsburgh",
                    state: "PA",
                    postalCode:'69420',
                },
                contactInfo: {
                    email:'fake@notreal.com',
                    phoneMobile: '2022002000',
                    phoneHome:''
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
                <AntdForm.Item label="Holder Wallet Address" name={['holder','partyAddress']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Holder Street Address Line 1" name={['holder','physicalLocation','streetAddressLine1']}>
                    <Input placeholder="" />
                </AntdForm.Item>  
                <AntdForm.Item label="Holder Street Address Line 2" name={['holder','physicalLocation','streetAddressLine2']}>
                    <Input placeholder="" />
                </AntdForm.Item> 
                <AntdForm.Item label="Holder City" name={['holder','physicalLocation','city']}>
                    <Input placeholder="" />
                </AntdForm.Item>       
                <AntdForm.Item label="Holder State" name={['holder','physicalLocation','state']}>
                    <Input placeholder="" />
                </AntdForm.Item>      
                <AntdForm.Item label="Holder ZIP Code" name={['holder','physicalLocation','postalCode']}>
                    <Input placeholder="" />
                </AntdForm.Item>        
                <AntdForm.Item label="Holder Email" name={['holder','contactInfo','email']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Holder Phone - Mobile" name={['holder','contactInfo','phoneMobile']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Holder Phone - Home" name={['holder','contactInfo','phoneHome']}>
                    <Input placeholder="" />
                </AntdForm.Item>

        </>
     );
}
 
export default HolderForm;
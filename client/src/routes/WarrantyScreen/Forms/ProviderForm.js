import React from 'react';
import { Form as AntdForm, Input, Button } from 'antd';

const ProviderForm = ({form}) => {
    const onFill = () => {
        form.setFieldsValue({
            provider: {
                name: 'Cutright Contracting LLC.', 
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
                    label="Provider Name"
                    name={['provider', 'name']}
                >
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Provider Wallet Address" name={['provider','walletAddress']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Provider Street Address Line 1" name={['provider','location','addressLine1']}>
                    <Input placeholder="" />
                </AntdForm.Item>  
                <AntdForm.Item label="Provider Street Address Line 2" name={['provider','location','addressLine2']}>
                    <Input placeholder="" />
                </AntdForm.Item> 
                <AntdForm.Item label="Provider City" name={['provider','location','city']}>
                    <Input placeholder="" />
                </AntdForm.Item>       
                <AntdForm.Item label="Provider State" name={['provider','location','state']}>
                    <Input placeholder="" />
                </AntdForm.Item>      
                <AntdForm.Item label="Provider ZIP Code" name={['provider','location','zip']}>
                    <Input placeholder="" />
                </AntdForm.Item>        
                <AntdForm.Item label="Provider Email" name={['provider','contactInformation','email']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Provider Phone - Mobile" name={['provider','contactInformation','mobilePhone']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Provider Phone - Home" name={['provider','contactInformation','workPhone']}>
                    <Input placeholder="" />
                </AntdForm.Item>

        </>
     );
}
 
export default ProviderForm;
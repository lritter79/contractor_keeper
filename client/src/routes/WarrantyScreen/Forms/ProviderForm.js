import React from 'react';
import { Form as AntdForm, Input, Button } from 'antd';

const ProviderForm = ({form}) => {
    const onFill = () => {
        form.setFieldsValue({
            provider: {
                name: 'Cutright Contracting LLC.', 
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
                    label="Provider Name"
                    name={['provider', 'name']}
                >
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Provider Wallet Address" name={['provider','partyAddress']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Provider Street Address Line 1" name={['provider','physicalLocation','streetAddressLine1']}>
                    <Input placeholder="" />
                </AntdForm.Item>  
                <AntdForm.Item label="Provider Street Address Line 2" name={['provider','physicalLocation','streetAddressLine2']}>
                    <Input placeholder="" />
                </AntdForm.Item> 
                <AntdForm.Item label="Provider City" name={['provider','physicalLocation','city']}>
                    <Input placeholder="" />
                </AntdForm.Item>       
                <AntdForm.Item label="Provider State" name={['provider','physicalLocation','state']}>
                    <Input placeholder="" />
                </AntdForm.Item>      
                <AntdForm.Item label="Provider ZIP Code" name={['provider','location','postalCode']}>
                    <Input placeholder="" />
                </AntdForm.Item>        
                <AntdForm.Item label="Provider Email" name={['provider','contactInfo','email']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Provider Phone - Mobile" name={['provider','contactInfo','phoneMobile']}>
                    <Input placeholder="" />
                </AntdForm.Item>
                <AntdForm.Item label="Provider Phone - Home" name={['provider','contactInfo','phoneHome']}>
                    <Input placeholder="" />
                </AntdForm.Item>

        </>
     );
}
 
export default ProviderForm;
import React from 'react';
import { useEffect, useState } from 'react';
import useLocalStorage from "../../customHooks/useLocalStorage";
import checkIfWarrantyExpired from '../../eth/checkIfWarrantyExpired';
import { getWarranty } from '../../eth/getWarranty'
import executeWarrantyMethod from '../../eth/executeWarrantyMethod';
import { Skeleton, Spin, Button, PageHeader, Tabs, Descriptions } from 'antd';
import { ethers } from "ethers";
import warrantyAbi from '../../eth/warrantyAbi';


const WarrantyView = () => {
    const { TabPane } = Tabs;
    const stateArr = ['Inactive','Active','Void']
    const [address, setAddress] = useLocalStorage("contractAddress", null)
    //const [address, setAddress] = useLocalStorage("contractAddress", null)
    const [warranty, setWarranty] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    async function getWarranty(){
        const provider = await new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner();
        let warrantySmartContract = await new ethers.Contract(address, warrantyAbi, signer)
        return warrantySmartContract
    }
    //const [isExpired, setIsExpired] = useState(null)
/*     async function transferWarranty(){
        setIsLoading(true)
        let warrantySmartContract = await warrantySmartContract()
        try {
            let waiter = await warrantySmartContract.
        } catch (error){
            console.log(error)
        }
        setIsLoading(false)
    } */

    async function voidWarranty() {
        setIsLoading(true)
        let warrantySmartContract = await warrantySmartContract()
        let waiter = await warrantySmartContract.voidWarranty()
        .then(async(res) => {return await res.wait()})
        .then(async(res) => {return await warrantySmartContract.stateOfWarranty()})
        .then(res => setWarranty(prev => {
            let newState = {...prev, stateOfWarranty:res}
            return newState
        }))
        .then(res => setIsLoading(false))
    }

    useEffect(() => {
        async function loadWithEthers() {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const warrantySmartContract = new ethers.Contract(address, warrantyAbi, provider)
            let projectName = await warrantySmartContract.projectName()
            let descriptionOfProject = await warrantySmartContract.descriptionOfProject()
            let location = await warrantySmartContract.getLocationAsString()
            let dte = await warrantySmartContract.getDaysUntilExpiration()
            let stateOfWarranty = await warrantySmartContract.stateOfWarranty()
            let isTransferable = await warrantySmartContract.isTransferable()
            let dateOfWorkCompletion = await warrantySmartContract.dateOfWorkCompletion();
            let warrantyExpirationDate = await warrantySmartContract.warrantyExpirationDate();
            let warrantyExpires = await warrantySmartContract.warrantyExpires()
            let numberOfDaysToCorrect = await warrantySmartContract.numberOfDaysToCorrect()
            let warrantyStartDate = await warrantySmartContract.warrantyStartDate()
            let warrantyProvider = await warrantySmartContract.warrantyProvider()
            let warranty = {
                projectName: projectName,
                descriptionOfProject: descriptionOfProject,
                location: location,
                dte:dte,
                stateOfWarranty: stateOfWarranty,
                isTransferable: isTransferable,
                dateOfWorkCompletion:dateOfWorkCompletion,
                warrantyExpirationDate: warrantyExpirationDate,
                warrantyExpires: warrantyExpires,
                numberOfDaysToCorrect:numberOfDaysToCorrect,
                warrantyStartDate:warrantyStartDate,
                warrantyProvider:warrantyProvider
            }
            setWarranty(warranty)
            setIsLoading(false)
        }
        loadWithEthers()


/*         let res = await getWarranty(address)
        .then(async (res) => {
            setWarranty(res)
            console.log(res)
            let projectName = await executeWarrantyMethod(res, 'projectName()')
            let descriptionOfProject = await executeWarrantyMethod(res, 'descriptionOfProject()')
            let location = await executeWarrantyMethod(res, 'getLocationAsString()')
            let dte = await executeWarrantyMethod(res, 'getDaysUntilExpiration()')
            //let expirationDate = await executeWarrantyMethod(res, 'projectName()')
            let contract = {
                projectName: projectName,
                descriptionOfProject: descriptionOfProject,
                location: location,
                dte:dte
            }
            setContract(contract)
            //res.methods.checkIfExpired()//.cal({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result){
        }).finally(() => setIsLoading(false)) */
    }
    , []);

    return (<div>
        {isLoading &&  
        <>
            <Spin />
            <Skeleton paragraph={{ rows: 9 }} />
        </>}
        {!isLoading && <>
            <PageHeader
                className="site-page-header"
                title={`${warranty.projectName}`}
                subTitle={`${warranty.location}`}
            />
            <div>
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Warranty Details" key="1">
                    <Descriptions title="" bordered column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item span={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }} label="Description">{`${warranty.descriptionOfProject}`} </Descriptions.Item>
                        <Descriptions.Item span={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }} label="Warranty Expiration Date">{`${warranty.warrantyExpirationDate}`}</Descriptions.Item>
                        <Descriptions.Item span={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }} label="Warranty Start Date">{`${warranty.warrantyStartDate}`}</Descriptions.Item>
                        <Descriptions.Item span={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }} label="Days To Expiration">{`${warranty.dte}`}</Descriptions.Item>
                        <Descriptions.Item span={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }} label="Number Of Days To Correct">{`${warranty.numberOfDaysToCorrect}`}</Descriptions.Item>                        
                        <Descriptions.Item span={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }} label="Status">{`${stateArr[warranty.stateOfWarranty]}`}</Descriptions.Item>
                        
                    </Descriptions>
                </TabPane>
                <TabPane tab="Holder Details" disabled={false} key="2">

                </TabPane>
                <TabPane tab="Provider Details" key="3">
                    <Descriptions title="" layout="vertical" bordered column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Name">{`${warranty.warrantyProvider.name}`}</Descriptions.Item>
                        <Descriptions.Item label="Wallet Address">{`${warranty.warrantyProvider.partyAddress}`}</Descriptions.Item>                        
                        <Descriptions.Item label="Email">{`${warranty.warrantyProvider.contactInfo.email}`}</Descriptions.Item>                        
                        <Descriptions.Item label="Phone (Mobile)">{`${warranty.warrantyProvider.contactInfo.phoneMobile}`}</Descriptions.Item>                        
                        <Descriptions.Item label="Phone (Home)">{`${warranty.warrantyProvider.contactInfo.phoneHome}`}</Descriptions.Item>                        
                    </Descriptions>
                </TabPane>
            </Tabs>
                {/* <ul>
                    <li key={1}>
                     
                    </li>
                    <li key={2}>
                        Description:                 
                    </li>
                    <li key={3}>
                        Location: {`${warranty.location}`}
                    </li>
                    <li key={4}>
                        Days to expiration: 
                    </li>               
                    <li key={5}>
                        Status: 
                    </li>
                </ul> */}
                <Button  onClick={() => {voidWarranty()}}>Void this warranty?</Button>
                {
                    //<Button  onClick={() => {transferWarranty()}}>Transfer this warranty?</Button>              
                }
            </div>
        </>}
    </div>);
}
 
export default WarrantyView;
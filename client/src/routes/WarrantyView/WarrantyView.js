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

    const [address, setAddress] = useLocalStorage("contractAddress", null)
    //const [address, setAddress] = useLocalStorage("contractAddress", null)
    const [warranty, setWarranty] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    //const [isExpired, setIsExpired] = useState(null)

    async function voidWarranty() {
        setIsLoading(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();

        const warrantySmartContract = new ethers.Contract(address, warrantyAbi, signer)
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

            let warranty = {
                projectName: projectName,
                descriptionOfProject: descriptionOfProject,
                location: location,
                dte:dte,
                stateOfWarranty: stateOfWarranty
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
            <Tabs defaultActiveKey="1">
                <TabPane tab="Warranty Details" key="1">
                    <Descriptions title="" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                        <Descriptions.Item label="Description" span={3}>{`${warranty.descriptionOfProject}`}  </Descriptions.Item>
                        <Descriptions.Item label="Days To Expiration">{`${warranty.dte}`}</Descriptions.Item>
                        <Descriptions.Item label="Status">{`${warranty.stateOfWarranty}`}</Descriptions.Item>
                    </Descriptions>
                </TabPane>
                <TabPane tab="Holder Details" disabled={false} key="2">
                </TabPane>
                <TabPane tab="Provider Details" key="3">
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
            </div>
        </>}
    </div>);
}
 
export default WarrantyView;
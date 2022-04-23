import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import useLocalStorage from "../../customHooks/useLocalStorage";
import checkIfWarrantyExpired from '../../eth/checkIfWarrantyExpired';
import { getWarranty } from '../../eth/getWarranty'
import executeWarrantyMethod from '../../eth/executeWarrantyMethod';


const WarrantyView = () => {
    const { address } = useParams();
    //const [address, setAddress] = useLocalStorage("contractAddress", null)
    const [warranty, setWarranty] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isExpired, setIsExpired] = useState(null)

    useEffect(async () => {
        let res = await getWarranty(address)
        .then(async (res) => {
            setWarranty(res)
            setIsLoading(false)
            console.log(res)
            await executeWarrantyMethod(res, 'checkIfExpired()').then(res2 => setIsExpired(res2))
            //res.methods.checkIfExpired()//.cal({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result){
        }).finally(() => setIsLoading(false))
    }
    , []);

    return ( <div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && <>
            {!isExpired && <div>not expired</div>}
            {isExpired && <div>expired</div>}
        </>}
    </div> );
}
 
export default WarrantyView;
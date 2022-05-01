import { getWarranty } from "./getWarranty";
import warrantyByteCode from "./warrantyByteCode";

export async function deployWarranty(warrantyArguments, web3) {
    let warrantyContract = await getWarranty(null, web3);
    let gas = await warrantyContract.deploy({data:warrantyByteCode, arguments: warrantyArguments}).estimateGas((err, g) => console.log(g));
    let accounts = await web3.eth.getAccounts((err, accounts) => { return accounts} );
    if(!accounts[0]) {
        throw 'no accounts found, please make sure your wallet is connected to the site. If it doesnt connect automatically, you have to connect manually'
    }
    let params = {gas: gas, from: accounts[0]}
    return await warrantyContract.deploy({data:warrantyByteCode, arguments: warrantyArguments}).send(params)
    .then(function(newContractInstance){
        return newContractInstance.options.address // instance with the new contract address
    });
}


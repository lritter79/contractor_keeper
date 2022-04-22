import { web3 } from "./web3";
import { getWarranty } from "./getWarranty";
import warrantyByteCode from "./warrantyAbi";

export async function deployWarranty(warrantyArguments) {
    let warrantyContract = getWarranty();
    let gas = warrantyContract.deploy({data:warrantyByteCode, arguments: warrantyArguments}).estimateGas((err, g) => console.log(g));
    const accounts = await web3.eth.getAccounts();
    let params = {gas: gas, address: accounts[0]}
    return await warrantyContract.deploy({data:warrantyByteCode, arguments: warrantyArguments}).send(params)
    .then(function(newContractInstance){
        return newContractInstance.options.address // instance with the new contract address
    });
}
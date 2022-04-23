import { web3 } from "./web3";

export default async function executeWarrantyMethod(warranty, method) {
    if (!warranty.methods[method]) return "No method"
    console.log(warranty.methods[method]())
    let gas = await warranty.methods[method]().estimateGas()
    console.log(gas)
    const accounts = await web3.eth.getAccounts();
    let params = {gas: gas, from: accounts[0]}
    return await warranty.methods[method].call(params)
}
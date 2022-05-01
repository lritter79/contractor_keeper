
export default async function checkIfWarrantyExpired(warranty, web3) {
    let gas = await warranty.methods.checkIfExpired().estimateGas()
    console.log(gas)
    const accounts = await web3.eth.getAccounts();
    let params = {gas: gas, from: accounts[0]}
    return await warranty.methods.checkIfExpired().call(params)
}
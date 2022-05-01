
export default async function executeWarrantyMethod(warranty, method, input, web3) {
    if (!warranty.methods[method]) return "No method"
    console.log(warranty.methods[method]())
    let gas = await warranty.methods[method]().estimateGas()
    console.log(gas)
    const accounts = await web3.eth.getAccounts();
    let params = {gas: gas, from: accounts[0]}
    let res = input ? await warranty.methods[method](input).call(params) : await warranty.methods[method]().call(params)
    console.log(res)
    return res
}
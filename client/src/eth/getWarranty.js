import warrantyAbi from "./warrantyAbi";

export async function getWarranty(contractAddress, web3) {
    if (contractAddress) {
        return await new web3.eth.Contract(warrantyAbi, contractAddress);   
    }
    return await new web3.eth.Contract(warrantyAbi);
}
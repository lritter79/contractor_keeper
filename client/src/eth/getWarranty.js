import { web3 } from "./web3";
import warrantyAbi from "./warrantyAbi";

export async function getWarranty(contractAddress) {
    if (contractAddress) {
        return await new web3.eth.Contract(warrantyAbi, contractAddress);   
    }
    return await new web3.eth.Contract(warrantyAbi);
}
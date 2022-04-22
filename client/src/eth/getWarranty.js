import { web3 } from "./web3";
import warrantyAbi from "./warrantyAbi";

export function getWarranty(contractAddress) {
    if (contractAddress) {
        return new web3.eth.Contract(warrantyAbi, contractAddress);   
    }
    return new web3.eth.Contract(warrantyAbi);
}
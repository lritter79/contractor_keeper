import Web3 from "web3";
//get thr browser's web 3 provider
export default async function getWeb3 (){
    if (window.ethereum) return new Web3(window.ethereum)
    return null
};
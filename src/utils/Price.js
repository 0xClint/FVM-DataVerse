import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constant";

const ethers = require("ethers");

export const getFilPriceData = async (signer) => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  let data = await contract.filPrice();
  console.log(Number(data) / 10 ** 18);

  return Number(data) / 10 ** 18;
};

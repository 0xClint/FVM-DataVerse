// const ethers = require("ethers");
import { ethers } from "ethers";

export async function donate(signer, addr, amount) {
  ethers.utils.getAddress(addr);
  const tx = await signer.sendTransaction({
    to: addr,
    value: ethers.utils.parseEther(amount),
  });
  console.log({ amount, addr });
  console.log("tx", tx);
  // return t
}

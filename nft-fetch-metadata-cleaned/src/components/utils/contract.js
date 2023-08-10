import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";

import ABI from "@/components/utils/abi.json";

export const getBalance = async (address) => {
  const provider = new JsonRpcProvider(process.env.QUICK_NODE_URI);
  const contract = new Contract(process.env.CONTRACT_ADDRESS, ABI, provider);
  const balance = await contract["balanceOf"](address);
  return +balance.toString();
};

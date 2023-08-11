import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import axios from 'axios';

import ABI from '@/components/utils/abi.json';

export const checkNft = async (address) => {
  const provider = new JsonRpcProvider(process.env.POLYGON_MUMBAI_RPC);
  const contract = new Contract(process.env.CONTRACT_ADDRESS, ABI, provider);
  const balance = await contract.balanceOf(address);
  // const currentTimestamp = Math.floor(Date.now() / 1000);
  const currentTimestamp = 1691946060;

  for (let i = 0; i < balance; i++) {
    const ownerTokenId = await contract.tokenOfOwnerByIndex(address, i);
    const dayIndex = await contract.tokenIdToDayIndex(ownerTokenId);
    const eventTimestamp = await contract.dailyEvents(dayIndex);

    if (currentTimestamp > eventTimestamp.toNumber() && currentTimestamp - eventTimestamp.toNumber() < 24 * 60 * 60) {
      const url = 'https://dev-e-wallet-api.qoincrypto.id/ticket/checkin';
      const data = {
        id: ownerTokenId.toNumber(),
      };

      const res = await fetchApi(url, data);
      console.log('response', res);

      if (!!res.status_code) {
        if (res.status_code === '201') {
          const ticketIndex = await contract.tokenIdToTicketIndex(ownerTokenId);
          const ticketData = await contract.tickets(ticketIndex);
          console.log('ticket found! ', ticketData.name);
          return ticketData.name;
        } else {
          return 'failed';
        }
      } else {
        return 'failed';
      }
    } else {
      console.log('ticket not found on this day!');
    }
  }
  console.log('ticket not found!');
  return 'failed';
};

async function fetchApi(url, data) {
  const res = await axios.post(url, data);
  if (!!res.data) {
    return res.data;
  } else {
    const res = await axios.post(url, data);
    return res.data;
  }
}

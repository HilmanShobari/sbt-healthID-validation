"use client";

import { useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { getBalance } from "@/components/utils/contract";

const ContentPage = () => {
  const { open, isOpen } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, status } = useAccount({});
  const [hasToken, setHasToken] = useState(false);
  const [fetchClicked, setFetchClicked] = useState(false);

  const fetchNFTs = async () => {
    const nfts = await getBalance(address);
    setHasToken(!!nfts);
    setFetchClicked(true);
  };

  useEffect(() => {
    if (status !== "connected" && !isOpen) {
      setTimeout(open, 250);
    }
  }, [status, isOpen]);

  useEffect(() => {
    if (fetchClicked || status === "connected") {
      setTimeout(async () => {
        await disconnect();
        await setHasToken(false);
      }, 5000);
    }
  }, [fetchClicked]);

  return (
    <>
      <p>{address || "Signed Out"}</p>
      <br />
      {status === "connected" && !hasToken && (
        <button onClick={fetchNFTs}>Check Balance</button>
      )}
      {address && fetchClicked && (
        <img
          src={
            hasToken
              ? "https://i.gifer.com/7efs.gif"
              : "https://cliply.co/wp-content/uploads/2021/07/372107370_CROSS_MARK_400px.gif"
          }
          width={400}
          height={400}
          alt="check"
        />
      )}
    </>
  );
};
export default ContentPage;

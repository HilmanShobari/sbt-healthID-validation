"use client";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import {
  ethereumClient,
  projectId,
  wagmiConfig,
} from "@/components/utils/walletconnect";
import ContentPage from "@/components/content";

function WCWrapper() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ContentPage />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default WCWrapper;

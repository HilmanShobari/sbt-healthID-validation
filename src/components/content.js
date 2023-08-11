'use client';

import { useWeb3Modal } from '@web3modal/react';
import { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { checkNft } from '@/components/utils/contract';

const ContentPage = () => {
  const { open, isOpen } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, status } = useAccount({});
  const [hasNft, setHasNft] = useState(null);
  const [nftCategory, setNftCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchNFTs = async () => {
    setIsLoading(true);
    const nfts = await checkNft(address);
    if (nfts !== null && nfts !== 'failed') {
      console.log(nfts);
      setHasNft(true);
      setNftCategory(nfts);
    } else {
      setHasNft(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (status !== 'connected' && !isOpen) {
      setTimeout(open, 250);
    }
  }, [status, isOpen, hasNft, open]);

  useEffect(() => {
    if (status === 'connected' && address) {
      fetchNFTs();
    }
  }, [status]);

  useEffect(() => {
    if (status === 'connected' && hasNft != null) {
      setTimeout(() => {
        disconnect();
        setHasNft(null);
      }, 7000);
    }
  }, [hasNft]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      {isLoading ? (
        <>
          <img src="loading.gif" alt="check" />
          <p>Loading...</p>
        </>
      ) : (
        <>
          {address && (
            <>
              {hasNft === true ? (
                <>
                  <h1>Jakarta Coldplay 2023</h1>
                  <img src="https://i.gifer.com/7efs.gif" width={400} height={300} alt="success" />
                  {/* <img src="https://i.gifer.com/7efs.gif" width={400} height={400} alt="success" /> */}
                  <h1>Category Ticket: {nftCategory}</h1>
                  <h1>Proses Checkin Berhasil 👍</h1>
                </>
              ) : hasNft === false ? (
                <>
                  <h1>Jakarta Coldplay 2023</h1>
                  <img src="failed.gif" width={400} height={400} alt="failed" />
                  {/* <img src="https://cliply.co/wp-content/uploads/2021/07/372107370_CROSS_MARK_400px.gif" width={400} height={400} alt="failed" /> */}
                  <h1>Proses Checkin Gagal 😢</h1>
                  <br />
                  <h4>Tiket tidak sesuai atau telah digunakan, silahkan scan ulang menggunakan tiket yang lain</h4>
                </>
              ) : null}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ContentPage;

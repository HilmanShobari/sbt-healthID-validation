import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const Content = (props) => {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = 'https://dev-e-wallet-api.qoincrypto.id/ids/check';
  const apiKey = 'Q97XCzBMH7xgqP7fLnK8kCYled';

  const handleResult = async (result) => {
    if (loading == true) return;
    try {
      setLoading(true);
      const res = await axios.post(
        apiUrl,
        { data: result },
        {
          headers: {
            'API-KEY': apiKey,
          },
        }
      );
      console.log('res ', res);
      if (res.data?.status_code === 200) {
        setStatus(true);
      } else {
        setStatus(false);
      }
      setMessage(res.data?.message);
    } catch (error) {
      setStatus(false);
      setMessage(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!!message) {
      setTimeout(() => {
        setMessage('');
      }, 10000);
    }
  }, [message]);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : message ? (
        status === true ? (
          <>
            <img src="https://i.gifer.com/7efs.gif" width={400} height={300} alt="status" />
            <h1>{message}</h1>
          </>
        ) : (
          <>
            <img src="failed.gif" width={300} height={300} alt="failed" />
            <h1>{message}</h1>
          </>
        )
      ) : (
        <>
          <h1>Scan Qr Code Anda</h1>
          <div className="qr-reader">
            <QrReader
              onResult={(result) => {
                if (!!result) {
                  handleResult(result?.text);
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Content;

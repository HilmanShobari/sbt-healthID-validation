import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const Content = (props) => {
     const [status, setStatus] = useState(null);
     const [message, setMessage] = useState('');
     const [data, setData] = useState('');
     const [loading, setLoading] = useState(false);

     const apiUrl = 'https://dev-e-wallet-api.qoincrypto.id/ids/check';
     const apiKey = 'Q97XCzBMH7xgqP7fLnK8kCYled';

     const handleResult = async (result) => {
          console.log('result', result);
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
               setData(res.data?.data);
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
                    setData('');
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
                              <div>
                                   <img src="https://i.gifer.com/7efs.gif" width={400} height={300} alt="status" />
                                   <h1>{message}</h1>
                                   <br />
                                   <ul>
                                        <li>Nama: {data.name}</li>
                                        <li>NIK: {data.NIK}</li>
                                        <li>Tanggal Lahir: {data.dateOfBirth}</li>
                                        <li>Nama Rumah Sakit: {data.hospitalName}</li>
                                        <li>Alamat Rumah Sakit: {data.hospitalAddress}</li>
                                   </ul>
                              </div>
                         </>
                    ) : (
                         <>
                              <div>
                                   <img src="failed.gif" width={300} height={300} alt="failed" />
                                   <h1>{message}</h1>
                              </div>
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

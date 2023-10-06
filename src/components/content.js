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
          <section className="App-section">
               {loading ? (
                    <div>Loading...</div>
               ) : message ? (
                    status === true ? (
                         <div className="success">
                              <img src="https://i.gifer.com/7efs.gif" width={300} height={200} alt="status" />
                              <h1>{message}</h1>
                              <br />
                              <div className="data">
                                   <img src={data.photo} width={100} />
                                   <p>Nama: {data.name}</p>
                                   <p>NIK: {data.NIK}</p>
                                   <p>Tanggal Lahir: {data.dateOfBirth}</p>
                                   <p></p>
                                   <p>Nama Rumah Sakit: {data.hospitalName}</p>
                                   <p>Alamat Rumah Sakit: {data.hospitalAddress}</p>
                              </div>
                         </div>
                    ) : (
                         <div className="failed">
                              <img src="failed.gif" width={200} height={200} alt="failed" />
                              <h1>{message}</h1>
                         </div>
                    )
               ) : (
                    <div className="qr-reader">
                         <h1>Scan Qr Code Anda</h1>
                         <div>
                              <QrReader
                                   onResult={(result) => {
                                        if (!!result) {
                                             handleResult(result?.text);
                                        }
                                   }}
                              />
                         </div>
                    </div>
               )}
          </section>
     );
};

export default Content;

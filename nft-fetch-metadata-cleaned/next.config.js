/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WALLET_CONNNECT_PROJECT_ID: process.env.WALLET_CONNNECT_PROJECT_ID,
    INFURA_ID: process.env.INFURA_ID,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    QUICK_NODE_URI: process.env.QUICK_NODE_URI,
  },
};

module.exports = nextConfig;

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blush-persistent-herring-983.mypinata.cloud',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  console.log('   - Local Network:', `http://${require('address').ip()}:3000`);
}

console.log(
  'NEXT_PUBLIC_COLLECTION_FABRIC_ADDRESS',
  process.env.NEXT_PUBLIC_COLLECTION_FABRIC_ADDRESS,
);
console.log(
  'NEXT_PUBLIC_MARKETPLACE_ADDRESS',
  process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
);
console.log(
  'NEXT_PUBLIC_ACCOUNT_MANAGER_ADDRESS',
  process.env.NEXT_PUBLIC_ACCOUNT_MANAGER_ADDRESS,
);

module.exports = nextConfig;

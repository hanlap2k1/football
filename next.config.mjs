/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'asset.asiasport.com',
            port: '',
          },
        ],
      },
};

export default nextConfig;

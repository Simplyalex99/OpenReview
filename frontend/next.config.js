/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3-media2.fl.yelpcdn.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    nftTracing: true,
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;

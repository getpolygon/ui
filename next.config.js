const withPWA = require("next-pwa");

const nextConfig = withPWA({
  pwa: {
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
});

module.exports = nextConfig;

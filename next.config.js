const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  pwa: {
    dest: "public",
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

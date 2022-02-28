const env = require("env-var");
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  // Specifying the environment variables here to ensure their validity
  env: {
    IRON_SESSION_SECRET: env
      .get("IRON_SESSION_SECRET")
      .required(true)
      .asString(),
    POLYGON_CORE_URL: env.get("POLYGON_CORE_URL").required(true).asUrlString(),
  },
};

const config = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  ...nextConfig,
});

module.exports = config;

const env = require("env-var");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  // swcMinify is a new next.js minifier that's much faster than the default one
  swcMinify: true,
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
    runtimeCaching,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  ...nextConfig,
});

module.exports = config;

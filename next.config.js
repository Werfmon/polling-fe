/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_API: process.env.BACKEND_API
  }
}

module.exports = nextConfig

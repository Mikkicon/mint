/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:[
      "upload.wikimedia.org",
      "gateway.pinata.cloud"
    ]
  }
}

module.exports = nextConfig

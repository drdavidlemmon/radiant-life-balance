/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@react-pdf/renderer'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'galaxy-prod.tlcdn.com' },
    ],
  },
}
module.exports = nextConfig

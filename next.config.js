/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['3000-irrrc18wt7swhmoi22iuk.e2b.app'],
  serverExternalPackages: ['@react-pdf/renderer'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'galaxy-prod.tlcdn.com' },
    ],
  },
}
module.exports = nextConfig

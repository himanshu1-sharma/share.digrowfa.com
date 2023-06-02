/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
ssr: false
const withVideos = require('next-videos')

module.exports = {
  //...
  experimental: {
    async rewrites() {
      return [
        { source: '/:id', destination: '/[id]' },
      ];
    },
  },
};

module.exports = nextConfig
module.exports = withVideos()

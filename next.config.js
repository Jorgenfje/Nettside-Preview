/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static optimization for pages using env vars
  output: 'standalone',
}

module.exports = nextConfig
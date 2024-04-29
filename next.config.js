/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: true,
  distDir: ".next",
  cleanDistDir: true,
};

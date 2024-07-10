/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader"
    })

    return config
  },
  images: {
    domains: ["i.dummyjson.com", "cdn.dummyjson.com"]
  }
}

module.exports = nextConfig
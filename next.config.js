// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: "./",
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // turbo: {
    //   rules: {
    //     // Option format
    //     "*.md": [
    //       {
    //         loader: "@mdx-js/loader",
    //         options: {
    //           format: "md",
    //         },
    //       },
    //     ],
    //     // Option-less format
    //     "*.mdx": ["@mdx-js/loader"],
    //   },
    // },
  },

  // typedRoutes: true,
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       fs: false,
  //     };
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;

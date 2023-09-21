/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dev.veritech.mn",
      "res.cloudinary.com",
      "localhost",
      "platform.mrtd.gov.mn",
      "lh3.googleusercontent.com",
    ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "3000",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "dev.veritech.mn",
        port: "3000",
        pathname: "/image/**",
      },
    ],
    minimumCacheTTL: 60,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    disableStaticImages: true,
  },
  experimental: {
    serverActions: true,
  },
  // experimental: {
  //   externalDir: true,
  //   typedRoutes: true,
  // },
  disableExperimentalFeaturesWarning: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  fontLoaders: [
    { loader: "@next/font/google", options: { subsets: ["latin"] } },
  ],
  i18n: {
    localeDetection: false,
    defaultLocale: "mn",
    locales: ["mn", "en"],
  },

  
};

module.exports = nextConfig;


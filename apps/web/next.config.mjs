/** @type {import('next').NextConfig} */
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   instrumentationHook: true,
  // },
  // productionBrowserSourceMaps: false,
  // transpilePackages: ["ui", "database", "botpress"],
  transpilePackages: ['ui', 'database'],
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  // https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-monorepo
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  }
}

export default nextConfig

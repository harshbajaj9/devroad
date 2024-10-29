/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   instrumentationHook: true,
  // },
  // productionBrowserSourceMaps: false,
  // transpilePackages: ["ui", "database", "botpress"],
  transpilePackages: ["ui", "database"],
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

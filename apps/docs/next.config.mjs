/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   instrumentationHook: true,
  // },
  // productionBrowserSourceMaps: false,
  transpilePackages: ["ui"],
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
};

export default nextConfig;

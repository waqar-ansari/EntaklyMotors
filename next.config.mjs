import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
    webpack(config) {
      config.resolve.modules.push(path.resolve(__dirname, '../common')); // Adjust path as needed
      return config;
    },
  };
 
export default withNextIntl(nextConfig);
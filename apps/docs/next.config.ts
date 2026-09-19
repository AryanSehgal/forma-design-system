import type { NextConfig } from 'next';
const config: NextConfig = {
  transpilePackages: ['@forma-design/ui'],
  devIndicators: false,
  webpack(config, { dev }) {
    if (dev) config.watchOptions = { ...config.watchOptions, poll: 1000, aggregateTimeout: 300 };
    return config;
  },
};
export default config;

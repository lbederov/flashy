import type { NextConfig } from "next";

//const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  //basePath: isProd ? '/flashy' : '',
 distDir: 'docs', // or any other name you prefer
 output: 'export',
 //basePath: '/docs',
 //assetPrefix: process.env.ASSET_PREFIX,
 //basePath: process.env.BASE_PATH,
};

export default nextConfig;

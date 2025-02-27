import type { NextConfig } from "next";

//const isProd = process.env.NODE_ENV === 'production';
//const envPath = isProd ? '/flashy/docs' : '/flashy';

const nextConfig: NextConfig = {
  /* config options here */
  //basePath: envPath,
  //reactStrictMode: true,
  //swcMinify: false,
 distDir: 'docs', // or any other name you prefer
 output: 'export',
 basePath: '/flashy/docs',
 //assetPrefix: process.env.ASSET_PREFIX,
 //basePath: process.env.BASE_PATH,
};

export default nextConfig;

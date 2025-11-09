import createMDX from '@next/mdx'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  /* config options here */
};

const withMDX = createMDX({
  // Add markdown plugins here, such as remark-gfm
})

export default withMDX(nextConfig);

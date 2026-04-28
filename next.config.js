/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
    typescript: {
    // Ignore TypeScript errors because types already checked during CI
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

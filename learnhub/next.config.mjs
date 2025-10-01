/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
  },
  webpack: (config, { isServer }) => {
    // Handle lucide-react and other external dependencies
    config.externals = config.externals || []
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    return config
  },
  experimental: {
    // Remove esmExternals warning source
  },
}

export default nextConfig

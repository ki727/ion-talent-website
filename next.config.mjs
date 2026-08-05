/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/referrals",
        destination: "/refer",
        permanent: true,
      },
    ]
  },
}

export default nextConfig

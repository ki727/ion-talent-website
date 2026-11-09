/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Preview deployments must not be indexed, even when visitors access / rather
  // than /global. This is an SEO safeguard, not an access-control substitute.
  async headers() {
    return process.env.VERCEL_ENV === "preview"
      ? [
          {
            source: "/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
          },
        ]
      : []
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

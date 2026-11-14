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
    // Open the global website directly when someone clicks "Visit" on this
    // branch's Vercel preview. Other branches and production remain unchanged.
    const globalBranchPreview =
      process.env.VERCEL_ENV === "preview" &&
      process.env.VERCEL_GIT_COMMIT_REF === "global-expansion"

    return [
      ...(globalBranchPreview
        ? [{ source: "/", destination: "/global", permanent: false }]
        : []),
      {
        source: "/global/north-america",
        destination: "/global/us",
        permanent: false,
      },
      {
        source: "/global/rest-of-world",
        destination: "/global/asia-pacific",
        permanent: false,
      },
      {
        source: "/referrals",
        destination: "/refer",
        permanent: true,
      },
    ]
  },
}

export default nextConfig

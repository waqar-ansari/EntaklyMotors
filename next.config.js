module.exports = {
  reactStrictMode: false,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://entaklymotors.com/backend_api/:path*',
        },
      ];
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "admin.entaklymotors.com",
        },
        {
          protocol: "https",
          hostname: "entaklymotors.com", // Add this if your images also come from this domain
        },
      ],
    },
  };
  
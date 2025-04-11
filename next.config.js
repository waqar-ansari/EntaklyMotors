module.exports = {
  reactStrictMode: false,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://backend.entaklymotors.com/:path*',
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
          hostname: "entaklymotors.com",
        },
      ],
    },
  };
  
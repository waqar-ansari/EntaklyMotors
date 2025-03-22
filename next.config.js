module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://entaklymotors.com/backend_api/:path*',
        },
      ];
    },
  };
  
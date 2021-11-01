module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/declaration',
        permanent: true,
      },
    ];
  },
}

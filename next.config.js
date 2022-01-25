module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/charter',
        permanent: true,
      }
    ];
  },
}

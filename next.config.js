module.exports = {
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/declaration',
      //   permanent: true,
      // },
      { // TODO: remove after we get all signatures
        source: '/declaration',
        destination: '/about',
        permanent: true,
      },
      { // TODO: remove after we get all signatures
        source: '/',
        destination: '/about',
        permanent: true,
      },
    ];
  },
}

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
        {
          source: '/softlaunch',
          destination: '/declaration/e-bw-AGkYsZFYqmAe2771A6hi9ZMIkWrkBNtHIF1hF4',
          permanent: true,
        },
    ];
  },
}

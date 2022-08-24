const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: '/merlin',
}

const withTM = require('next-transpile-modules')(['flexlayout-react', 'date-fns']);

module.exports = withTM(nextConfig);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  basePath: '/merlin',
}

const withTM = require('next-transpile-modules')(['flexlayout-react']); // pass the modules you would like to see transpiled

module.exports = withTM(nextConfig);

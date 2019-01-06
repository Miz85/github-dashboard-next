const withTypescript = require('@zeit/next-typescript');
const path = require('path');
module.exports = withTypescript({
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  webpack(config, options) {
    config.resolve.modules.push(path.resolve(__dirname));
    return config;
  }
});

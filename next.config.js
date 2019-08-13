const path = require('path');
module.exports = {
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  webpack(config, options) {
    config.resolve.modules.push(path.resolve(__dirname));
    return config;
  }
};

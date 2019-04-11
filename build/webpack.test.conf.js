const utils = require('./utils'),
      webpack = require('webpack'),
      merge = require('webpack-merge'),
      baseConfig = require('./webpack.base.conf');

const webpackConfig = merge(baseConfig, {
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    })
  ]
})

delete webpackConfig.entry

module.exports = webpackConfig

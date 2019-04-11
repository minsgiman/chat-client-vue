const utils = require('./utils'),
      webpack = require('webpack'),
      config = require('../config'),
      merge = require('webpack-merge'),
      baseWebpackConfig = require('./webpack.base.conf'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin([
        {from: './resources', to: './resources'}
    ])
  ]
})

const path = require('path'),
    utils = require('./utils'),
    config = require('../config');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
          test: /\.less$/,
          loader: 'style-loader!css-loader!less-loader'
      },
      {
          test: /\.css$/,
          use: [
              'vue-style-loader',
              'css-loader'
          ]
      },
      {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
              loaders: {
                  js: 'babel-loader?presets[]=es2015',
                  less: 'vue-style-loader!css-loader!less-loader'
              }
          }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

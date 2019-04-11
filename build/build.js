const ora = require('ora'),
      rm = require('rimraf'),
      path = require('path'),
      chalk = require('chalk'),
      webpack = require('webpack'),
      config = require('../config'),
      webpackConfig = require('./webpack.prod.conf'),
      spinner = ora('building for production...');

spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
  })
})

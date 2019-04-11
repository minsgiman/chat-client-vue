// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    customLaunchers: {
        Chrome_without_security: {
            base: 'Chrome'
        }
    },
    browserConsoleLogOptions: { level: 'log' },
    frameworks: ['jasmine'],
    reporters: ['progress', 'html'],
    htmlReporter: {
        outputFile: 'test/units.html',

        // Optional
        pageTitle: 'Unit Tests',
        subPageTitle: 'Chat Unit Tests',
        groupSuites: true,
        useCompactStyle: true,
        useLegacyStyle: true
    },
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}

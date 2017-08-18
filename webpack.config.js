/* global __dirname, require, module */

const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const env = require('yargs').argv.env // use --env with webpack 2
let libraryName = 'GeomTools'

const resolve = (dir) => {
  return path.join(__dirname, './', dir)
}

let plugins = [
  new webpack.BannerPlugin('This file is created by FDD'),
  new FriendlyErrorsPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

let outputFile

if (env === 'build') {
  let _plugins = [
    new UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerPort: 8888
    })
  ]
  plugins = plugins.concat(_plugins)
  outputFile = libraryName + '.min.js'
} else {
  // extract css into its own file
  let __plugins = []
  plugins = plugins.concat(__plugins)
  outputFile = libraryName + '.js'
}

const config = {
  entry: './src/index.js',
  // devtool: '#cheap-module-eval-source-map',
  // devtool: '#eval-source-map',
  devtool: '#source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {},
  module: {
    rules: [
      {
        test: /(\.js)$/,
        enforce: 'pre',
        loader: 'eslint-loader', // 在babel-loader对源码进行编译前进行lint的检查
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules')]
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: plugins
}

module.exports = config

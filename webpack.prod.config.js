const config = require('./webpack.config.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

config.devtool = 'cheap-source-map'

config.plugins.push(
  new UglifyJSPlugin({
    uglifyOptions: {
      compress: {warnings: false},
      output: {comments: false},
    },
    sourceMap: true,
  }))

module.exports = config

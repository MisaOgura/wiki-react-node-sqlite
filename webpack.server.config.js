const fs = require('fs')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const plugins = [
  new CleanWebpackPlugin(['build/js'], {
    verbose: true
  })
]

module.exports = {
  entry: path.resolve(__dirname, './app/server.js'),
  target: 'node',
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        use: {loader: 'babel-loader'},
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins,
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.server.js'
  }
}

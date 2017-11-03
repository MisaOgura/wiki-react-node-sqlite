const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const plugins = [
  new CleanWebpackPlugin(['build/js'], {
    verbose: true
  })
]

module.exports = {
  entry: './app/index.js',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './public',
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins,
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  }
}

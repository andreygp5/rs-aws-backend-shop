const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new ESLintPlugin()],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  }
}

'use strict'

const path = require('path')

const {
  HotModuleReplacementPlugin
} = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let plugins = [
  new HtmlWebpackPlugin({
    title: 'Frontend boilerplate',
    template: './client/index.html'
  }),
  new HotModuleReplacementPlugin()
]

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  entry: {
    main: [
      './client/index.js'
    ]
  },
  output: {
    path: path.resolve('./public'),
    filename: '[name].js',
    publicPath: 'http://localhost:9090/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: {
        test: path.resolve(__dirname, 'node_modules')
      },
      loader: 'babel-loader'
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve('./client'),
      path.resolve('./')
    ],
    extensions: ['.js', '.css', '.scss']
  },
  plugins,
  devServer: {
    port: 9090,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    proxy: {
      '/api/origins': {
        target: 'https://0sysjslkra.execute-api.us-east-1.amazonaws.com/test/stations/origins',
        pathRewrite: {'^/api/origins' : ''},
        changeOrigin: true,
      }
    }
  }
}

require('dotenv').config()

const path = require('path')
const merge = require('webpack-merge')
const common = require('./common.js')

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../serve'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../serve'),
    //public: 'http://4439eeb7.ngrok.io',
    // port: process.env.CLIENT_PORT || 8080,
    port: process.env.CLIENT_PORT,
    allowedHosts: [
      '.ngrok.io'
    ]
  }
})
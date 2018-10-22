const path = require('path');
module.exports = {
  entry: {
    appClient: './src/appClient.js',
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: "[name].js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
 }
}

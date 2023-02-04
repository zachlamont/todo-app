const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      //print: './src/print.js',
    },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },

};
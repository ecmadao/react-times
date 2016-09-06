const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    "TimePicker": "./src/TimePicker.js"
  },
  output: {
    filename: '[name].js',
    path: './lib/components/',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        loader: ["babel-loader"],
        query: {
          cacheDirectory: true,
          presets: ["react", "es2015"]
        }
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.NoErrorsPlugin()
  ],
  debug: false
};

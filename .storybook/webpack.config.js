const path = require('path');
const webpack = require('webpack');

const SOURCE_PATH = path.join(__dirname, '../src');

module.exports = {
  context: SOURCE_PATH,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
        include: SOURCE_PATH,
      },
      {
        test:   /\.css/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../css/')
      },
      {
        test:   /\.css/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../src/')
      },
      {
        test: /\.svg$/,
        loader: 'babel!react-svg'
      },
      {
        test: /\.(js|jsx)$/,
        include: SOURCE_PATH,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      minimize: true,
      options: {
        context: SOURCE_PATH,
      }
    }),
  ],
  devtool: '#source-map',
};

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
};

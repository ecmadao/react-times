const webpack = require('webpack');

const path = require('path');
const fs = require('fs');
const srcFolder = path.join(__dirname, 'src', 'components');
const components = fs.readdirSync(srcFolder);

const files = [];
const entries = {};
components.forEach(component => {
  const name = component.split('.')[0];
  if (name) {
    const file = `./src/components/${name}`;
    files.push(file);
    entries[name] = file;
  }
});

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    path: './lib/components/',
    libraryTarget: 'commonjs2',
  },
  externals(context, request, callback) {
    if (files.indexOf(request) > -1) {
      return callback(null, false);
    }
    return callback(null, true);
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        loader: ["babel-loader"],
        query: {
          presets: ["react", "es2015"]
        }
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};

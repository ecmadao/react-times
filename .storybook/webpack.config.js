const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test:   /\.css/,
        loaders: ['style', 'css'],
        include: path.resolve(__dirname, '../css/')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

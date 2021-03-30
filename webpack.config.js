const path = require('path');
const SRC_DIR = path.join(__dirname, 'client');
const OUT_DIR = path.join(__dirname, 'client', 'dist');

module.exports = {
  entry: path.join(SRC_DIR, 'index.jsx'),
  output: {
    path: OUT_DIR,
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|css)$/i, /*/\.(js|jsx)$/,*/
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

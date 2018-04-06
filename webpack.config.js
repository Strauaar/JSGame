module.exports = {
  entry: './js/root.js',
  output: {
    filename: './js/bundle.js',
  },
  module: {
    rules: [
        {
          test: [/\.jsx?$/],
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};

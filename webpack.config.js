const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      buffer: require.resolve('buffer/'), // Polyfill cho buffer
      stream: require.resolve('stream-browserify'), // Polyfill cho stream
      fs: false, // Vô hiệu hóa fs
      path: false, // Vô hiệu hóa path
      crypto: false, // Vô hiệu hóa crypto nếu không cần
      vm: false, // Vô hiệu hóa vm nếu không cần
    },
  },
  mode: 'development',
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  optimization: {
    // minimize: true,
    // minimizer: [
    //   new TerserPlugin({
    //     terserOptions: {
    //       compress: {
    //         drop_console: true
    //       }
    //     }
    //   })
    // ]
  },
  entry: {
    main: path.resolve(__dirname, '../test/main.js')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    host: '0.0.0.0'
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new CopyPlugin([
      { from: path.resolve(__dirname, '../public/static'), to: 'static' }
    ]),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.less'],
    mainFiles: ['index']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
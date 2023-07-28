const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const generateCopyPatterns = () =>
  ['assets/img'].map((dir) => ({
    from: dir,
    to: dir,
  }));

module.exports = (env, argv) => {
  return {
    mode: argv.mode,
    context: path.resolve(__dirname, 'src'),
    entry: ['./assets/js/main.js', './assets/css/style.sass'],
    output: {
      filename: 'assets/js/main.js',
      path: path.resolve(__dirname, 'public'),
      clean: {
        keep: /(.*\.php|^style\.css)/
      },
    },
    module: {
      rules: [
        {
          test: /\.(scss|sass|css)$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], 
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'assets/css/style.css',
      }),
      new CopyPlugin({
        patterns: generateCopyPatterns(),
      }),
      new BrowserSyncPlugin({
        host: 'localhost',
        files: ['./**/*.php'],
        port: 3000,
        proxy:{target:'http://localhost:8080'},
        notify: false,
      }),
    ],
    optimization: {
      minimize: argv.mode === 'production' ? true : false,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin(),
      ],
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  };
};
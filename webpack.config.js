const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const setMode = env.mode ?? 'production';
  return {
    mode: setMode,
    entry: {
      main: path.resolve(__dirname, 'src', 'index.tsx'),
      initColorScheme: path.resolve(
        __dirname,
        'src/features/colorScheme',
        'initColorScheme.ts'
      ),
      sw: path.resolve(
        __dirname,
        'src/features/serviceWorker',
        'service.worker.ts'
      ),
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@components': path.resolve('./src/components'),
        '@features': path.resolve('./src/features'),
        '@app': path.resolve('./src/app'),
        '@images': path.resolve('./src/images'),
      },
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      // path: env.github
      //   ? path.resolve(__dirname, 'dist')
      //   : '/var/www/dist',
      publicPath: env.github ? '' : '/',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /service\.worker\.ts$/i,
          use: 'ts-loader',
          type: 'asset/resource',
          generator: {
            filename: 'sw.js',
          },
        },
        {
          test: /\.(png|svg|webp|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.webmanifest$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(?:ts|tsx)$/,
          use: 'ts-loader',
          exclude: [/node_modules/, /worker\.ts$/],
        },
      ],
    },
    optimization: {
      runtimeChunk: setMode === 'production' ? false : 'single',
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: './src/images/favicon.ico',
        template: './src/index.html',
        excludeChunks: ['sw'],
      }),
      new HtmlInlineScriptPlugin({
        scriptMatchPattern: [/initColorScheme\..+\.js$/],
      }),
      new MiniCssExtractPlugin({
        filename: 'bundle.[contenthash].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/images/icons', to: 'img/' },
          'src/app/manifest.webmanifest',
        ],
      }),
      // new BundleAnalyzerPlugin(),
    ],
    stats: {
      children: true,
    },
    devServer: {
      open: true,
      historyApiFallback: true,
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    devtool:
      setMode === 'production'
        ? false
        : 'eval-cheap-module-source-map',
  };
};

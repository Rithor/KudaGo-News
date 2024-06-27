const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

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
      path: env.github
        ? path.resolve(__dirname, 'dist')
        : '/var/www/dist',
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
          test: /\.(?:png|svg|jpg)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(?:ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      runtimeChunk: setMode === 'production' ? false : 'single',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new HtmlInlineScriptPlugin({
        scriptMatchPattern: [/initColorScheme\..+\.js$/],
      }),
      new MiniCssExtractPlugin({
        filename: 'bundle.[contenthash].css',
      }),
    ],
    devServer: {
      open: true,
      historyApiFallback: true,
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};

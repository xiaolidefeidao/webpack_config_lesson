/**
 *Created by 01369606 on 2018/11/6.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const mock = require('../mock/mock.js');


const config = merge.smart(baseConfig, {
  entry: {
    index: './src/js/index.js',//此处使用的相对路径'./'，是因为webpack.config.js与src目录处于同级
    log:'./src/js/log.js'
  },
  output: {
    path: path.resolve(__dirname, '../sit')
  },
  module: {
    rules: [
      /*      {
              enforce: 'pre',     //注册前置加载器
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: "eslint-loader",
            },*/
      {
        test: /\.s?css$/,
        //把 loader 应用的文件范围缩小
        include: [
          path.resolve(__dirname, '../src')
        ],
        use: ['style-loader', 'css-loader', 'sass-loader']  //将CSS打包进js文件中
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: 'img/[name]-[hash].[ext]'
          }
        }]
      }
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "log",
          name: "log", // 使用 log 入口作为公共部分
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 在output.path基础上配置输出文件的路径和文件名
      template: './src/index.html', // 配置文件模板
      // chunks: ["index"],//默认导入所有chunks
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
      }
    }),
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),  //定义了全局变量__DEV__
    })
  ],
  devServer: {
    // proxy: {},
    hot: true,
    port: '8082',
    before(app) {
      mock(app) // 调用 mock 函数
    }
  }
});

/*config.plugins.push(

);*/

module.exports = config;
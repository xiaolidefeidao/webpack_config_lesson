/**
 *Created by 01369606 on 2018/11/6.
 */
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');
//webpack4.0之后mini-css-extract-plugin取代了extract-text-webpack-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const config = merge.smart(baseConfig, {
  entry: {
    index: './src/js/index.js',//此处使用的相对路径'./'，是因为webpack.config.js与src目录处于同级
    foo: './src/js/foo.js',
    // log: './src/js/log.js' //另一种chunk split 方式
  },
  output: {
    path: path.resolve(__dirname, '../build')
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        //把 loader 应用的文件范围缩小
        include: [
          path.resolve(__dirname, '../src')
        ],
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            minimize: true, // 使用 css 的压缩功能
          },
        }, 'sass-loader']  //将CSS打包进js文件中
      },
      /*      {
              test: /\.(png|jpg|gif)$/,
              use: [{
                loader: "file-loader",
                options: {
                  outputPath: 'img/',
                  name: '[name]-[hash:7].[ext]',   //和outputPath一起，决定了图片文件的输出目录和文件名;name等于编译后在css中图片文件url
                  publicPath: '../img/'       //因为生产环境的css文件被抽离出来，css中的图片路径是基于css文件路径的；会拼接编译后在css中图片文件url路径
                }
              }]
            },*/
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',//默认值为 file-loader ；图片大小大于 limit 时交由 fallback 指定的 loader 处理；options 中的配置会被传递给 fallback
              limit: 8192, // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理
              name: 'img/[name]-[hash].[ext]',
              publicPath: '../'
            },
          }, {
            //压缩图片
            //为提升 webpack 构建性能，可以将图片压缩的工作提前做好
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // 压缩 jpeg 的配置
                progressive: true,
                quality: 65
              },
              optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false,
              },
              pngquant: { // 使用 imagemin-pngquant 压缩 png
                quality: '65-90',
                speed: 4
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
              },
              webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: 75
              },
            }
          }
        ],
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vend: {
          chunks: "initial",
          test: path.resolve(__dirname, "../src/js/log"),//log.js作为公共部分；reg 式：/react|angluar|lodash/；entry.log方式
          // test:'log',
          name: "log", // 使用 log 入口作为公共部分；生成共享代码文件
          enforce: true,
        },
      },
    },
  }
});
config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "css/[name]-[chunkhash].css",//在output.path基础上配置输出文件的路径和文件名
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 在output.path基础上配置输出文件的路径和文件名
      template: './src/index.html', // 配置文件模板
      // chunks: ["index","log"],//默认导入所有chunks
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true, // 压缩 HTML 中出现的 JS 代码
        removeComments: true
      }
    }),
);

module.exports = config;
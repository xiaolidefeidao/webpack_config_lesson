const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
//webpack4.0之后mini-css-extract-plugin取代了extract-text-webpack-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mock = require('./mock.js');

module.exports = {
  entry: {
    index: './src/js/index.js',
    foo3: './src/js/foo.js',
    bar: './src/js/bar.js',
  },
  output: {
    // publicPath: "/dist/",
    path: path.resolve(__dirname, 'dist'),//配置输出文件的路径
    filename: 'js/[name]-[hash].js',//在output.path基础上配置输出文件的路径和文件名
    hashDigestLength: 8 // 默认长度是20
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
      },
      //会将CSS打包进JS中，并在页面中动态插入<style>
      /*      {
              test:/\.css$/,
              include: [
                path.resolve(__dirname, 'src')
              ],
              use: ['style-loader','css-loader']
            }*/

      //在webpack4.0之后使用mini-css-extract-plugin将CSS从JS中提取出来
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it use publicPath in webpackOptions.output
            // publicPath: '../'
          }
        }, 'css-loader']
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {}
        }]
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.mjs', '.js', '.json', '.jsx']
  },
  plugins: [
    new UglifyPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name]-[hash].css",//在output.path基础上配置输出文件的路径和文件名
      // chunkFilename: "[id].css"   chunkFilename是未被列在entry中，却又需要被打包出来的文件命名配置，用于异步加载
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',//配置文件模板
      filename: 'index.html',//在output.path基础上配置输出文件的路径和文件名
      chunks: ["index", 'foo3']//默认导入所有chunks
    })
  ],
  devServer: {
    // proxy: {},
    port: '8082',
    before(app) {
      mock(app) // 调用 mock 函数
    }
  }
};

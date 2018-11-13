const path = require('path');

module.exports = {
  output: {
    // filename: 'js/[name]-[chunkhash].js',//在output.path基础上配置输出文件的路径和文件名
    // chunkFilename: 'splitjs/[name]-[chunkhash].js',//动态加载的文件名
    //在生产环境才能使用chunkhash，development 使用chunkhash会报错
    filename: 'js/[name]-[hash].js',
    chunkFilename: 'splitjs/[name]-[hash].js',
    hashDigestLength: 8 // 默认长度是20
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, '../src')//此处使用的相对路径'../'，是因为path.resolve会返回一个绝对路径
        ],
        use: 'babel-loader'
      },
    ]
  },
  //减少 resolve 的解析
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../src')],//此处使用的相对路径'../'，是因为path.resolve会返回一个绝对路径
    extensions: ['.js', '.json']//'.mjs', '.jsx'
  },
  plugins: []
};
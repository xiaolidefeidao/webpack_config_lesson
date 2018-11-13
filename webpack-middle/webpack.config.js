const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = function (env, argv) {
  console.log(process.env.NODE_ENV)//undefined;此时该变量未定义，在入口文件index.is中可以获取到该值
  console.log(env)
  console.log(argv)//npm run sit => argv.test===sit
  let config;
  if (argv.mode === 'development') {
    config = require('./configs/webpack.development');
    config.plugins.push(new CleanWebpackPlugin(['sit']),
    );
  } else {
    config = require('./configs/webpack.production');
    config.plugins.push(new CleanWebpackPlugin(['build']));
  }
  return config;
};
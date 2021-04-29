/* 先安装path模块  npm  install  path  --save ,之后重新运行项目  */
const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      // .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('views', resolve('./src/views'))
      .set('network', resolve('./src/network'))
    // .set('bus', resolve('./src/bus'))
    // store 和 router 没必要配置，this.router this.store可以直接拿到
  },
  // devServer: {
  //   hot: true,//自动保存
  //   open: true,//自动启动
  //   port: 8080,//默认端口号
  //   host: "0.0.0.0"
  // }
}
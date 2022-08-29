const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // ws: true,  //如果要代理 websockets，配置这个参数
        // secure: false,  // 如果是https接口，需要配置这个参数
        // changeOrigin: true //是否跨域
      },
    }
  },
  productionSourceMap: false  // 去除掉打包时所产生的map文件

})

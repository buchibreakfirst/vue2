const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false , //打包后dist就没有map文件了   map文件是用来确认报错位置的（打包的js都是乱码）
  transpileDependencies: true,
  lintOnSave:false,

  devServer:{
    proxy:{
    '/api':{
      target:"http://gmall-h5-api.atguigu.cn",
      changeOrigin: true,

    }
  }}
})


// http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList

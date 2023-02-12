import Vue from 'vue'
import App from './App.vue'
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)
import store from './store'
import router from './router'

import {MessageBox,Button} from 'element-ui' //element-ui 两种注册方式 
Vue.prototype.$alert = MessageBox.alert;  //1.挂在原型上 
Vue.prototype.$msgbox = MessageBox;
Vue.component(Button.name,Button) //2.全局组件

//统一接口api文件夹里面全部请求函数
import * as API from '@/api'

import '@/mock/mockServe'
//swiper样式
import 'swiper/css/swiper.css'

import Carousel from '@/components/Carousel'
Vue.component(Carousel.name,Carousel)

Vue.config.productionTip = false

//引入表单校验插件
import '@/plugins/validate'

import atm from '@/assets/1.gif'
//引入懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  //加载默认图片
  loading:atm
})

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
    //放到原型对象上直接可以通过$API使用
    Vue.prototype.$API = API 
  },
  router,
  store,
}).$mount('#app')

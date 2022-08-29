import Vue from 'vue'
import App from './App.vue'


// 引入Vuex 以及相关的store文件
import store from '@/store'

// =====================================================
// 引入vue-router
import VueRouter from 'vue-router'
// 引入路由文件 router
import router from '@/router/index';
// Vue使用vue-router
Vue.use(VueRouter)

// ======================================================
// 注册全局组件
import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav',TypeNav)
// 注册轮播图为全局组件
import Carousel from "@/components/Carousel"
Vue.component('Carousel',Carousel)
// 注册分页器组件为全局组件
import Pagination from "@/components/Pagination"
Vue.component('Pagination',Pagination)

// ======================================================
// 向全局暴露所有的API接口(引入全部的请求函数)
import * as API from '@/api'

// ======================================================
// 引入相关的mock数据的文件
import '@/mock/serve'

//引入swiper需要使用的样式[项目当中用到swiper的地方很多，样式引入一次即可
import 'swiper/css/swiper.min.css'

// 按需引入element-ui
import { Button, Notification, MessageBox } from 'element-ui'
Vue.component(Button.name, Button);
/* 或写为
 * Vue.use(Button)
 */
//注册组件的形式：把elementUI中组件挂载到Vue.prototype原型对象上
//把组件挂载原型对象身上，则全部组件实例都可以获取到
Vue.prototype.$notify = Notification;

//注册弹框组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// =======================================================
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入加载图片
// import load from '@/assets/images/loading.gif'
Vue.use(VueLazyload, {
  //设置图片懒加载默认图片
  loading: require('@/assets/images/loading.gif')
})

// =======================================================
// 引入自定义插件
// import myPlugin from '@/plugins/myPlugin'
// Vue.use(myPlugin, {
//   name: 'wzx'
// })

// =======================================================
// 引入表单验证插件
import '@/plugins/validate'


// 关闭生产提示
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  //注册路由,给组件的身上添加了$router与$route两个属性
  router,
  //注册仓库，给每一个组件的身上添加$store属性
  store,

  beforeCreate() {
    //配置全局事件总线
    // Vue.prototype.$bus = this;
    //把全部的请求函数：作为Vue.prototype的属性，组件实例可以获取
    //请求函数只需要注册一次，可以在组件当中使用。
    Vue.prototype.$API = API;
    Vue.prototype.$bus = this
  },

}).$mount('#app')

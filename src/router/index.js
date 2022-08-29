import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

Vue.use(VueRouter)

// 重写vue-router原型对象上的push和replace方法，以解决NavigationDuplicated错误
// 出现NavigationDuplicated错误的原因:push和replace的返回对象是一个promise对象
// 而promise对象需要接收成功回调和失败回调，如果没有这两个，便会报错NavigationDuplicated错误
// 备份vue-router原型对象上原有的push和replace方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写push方法 
// 第一个参数：push方法要跳转的路由，第二个参数：成功回调，第三个参数：失败回调
VueRouter.prototype.push = function(location,resolve,reject) {
  if(resolve && reject) {
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,() => { },() => { }) 
  }
}
// 重写replace方法
VueRouter.prototype.replace = function(location,resolve,reject) {
  if(resolve && reject) {
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,() => { },() => { }) 
  }
}

// ==============================================================================

import routes from './routes'

const router =  new VueRouter({
  // 配置路由
  routes,
  mode:'history',
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y : 0 }
  },
})

router.beforeEach(async(to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  
  if(token) {   //用户已经输入用户名+密码登录 生成---【token】
    
    if(to.path == '/login') {   //用户登陆了，且想去登录页的分支
      next('/home')

    } else {    
                //代表用户登录了（且去的不是login），而且还有用户信息
      if(name) {
        next() 
      } else {    //代表用户登录了，但没有用户信息

        try{
          await store.dispatch('user/getUserInfo')
          next()
        } catch(error) {
          await store.dispatch('user/userLoginOut')
          next('/login')
          
        }
      }
    }

  } else {  // 用户未登录

    let toPath = to.path

    if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1 ||  toPath.indexOf('shopcart') != -1) {
      //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
      //跳转到登录页
      next('/login?redirect='+toPath);
    } else {
          //去的并非上面这些路由,放行
          next();
    }

  }
})

export default router
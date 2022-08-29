// 该文件专门用于创建整个应用的路由器
// import VueRouter from 'vue-router'

export default [
    // 主页路由
    {
      path:'/home',
      component: () => import ('@/pages/Home'),
      meta:{ show:true }
    },
    // 重定向 / => /home
    { path: '/', redirect: '/home' },

    // 登录路由
    {
      path:'/login',
      component: () => import ('@/pages/Login'),
      meta:{ show:false }
    },

    // 注册路由
    {
      path:'/register',
      component: () => import ('@/pages/Register'),
      meta:{ show:false }
    },

    // 搜索路由
    {
      name:'search',
      path:'/search/:keyword?',
      component: () => import ('@/pages/Search'),
      meta:{ show:true },
    },

    // 商品详情页路由
    {
      path:'/detail/:skuId',
      component: () => import ('@/pages/Detail'),
      meta:{ show:true }
    },

    // 商品添加成功页面路由
    {
      name: 'addshopcart',
      path: '/addcartsuccess',
      component: () => import ('@/pages/AddCartSuccess'),
      meta: { show: true } 
    },

    // 购物车页面路由
    {
      name: 'shopCart',
      path: '/shopcart',
      component: () => import ('@/pages/ShopCart'),
      meta: { show: true }
    },

    // 结算页面路由
    {
      path: '/trade',
      component: () => import ('@/pages/Trade'),
      meta:{ show: true }
    },
    // 支付页面路由
    {
      path: '/pay/:orderId?',
      component: () => import ('@/pages/Pay'),
      meta: { show: true}
    },
    // 支付成功页面
    {
      path: '/paysuccess',
      component: () => import ('@/pages/PaySuccess'),
      meta: { show: true}
    },
    // 我的订单页面 
    {
      path: '/center',
      component: () => import ('@/pages/Center'),
      meta: { show: true},
      children: [
        {
          path: 'myorder',
          component: () => import ('@/pages/Center/myOrder')
        },
        {
          path: 'grouporder',
          component: () => import ('@/pages/Center/groupOrder')
        }
      ]
    }
  ]

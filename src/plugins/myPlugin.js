// 自定义插件，对外暴露一个对象
let myPlugin = {

}

myPlugin.install = function (Vue, options) {
  console.log('调用myPlugin');
  console.log(Vue);   // Vue构造函数
  console.log(options);   // 传过来的参数对象
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive(options.name, {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
      console.log(el);
      console.log(binding);
    } // el: 当前绑定的元素
    
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
   
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}

export default myPlugin
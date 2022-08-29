// 对axios的二次封装，加装请求拦截器和响应拦截器
import axios from 'axios'

// 引入进度条插件以及样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const mockRequests = axios.create({

  baseURL: '/mock',

  timeout: 5000
})


// 请求拦截器
//config，请求拦截器的一个配置对象，包含有请求头
mockRequests.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  nprogress.start()
  return config
},(error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 响应拦截器
mockRequests.interceptors.response.use((response) => {
  // 对响应数据做点什么
  nprogress.done()
  return response.data;
},(error) => {
  // 对响应错误做点什么
  return Promise.reject(error);
})

export default mockRequests
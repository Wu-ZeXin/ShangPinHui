// 引入mock
import Mock from 'mockjs'

// 引入数据文件
import banner from './banner.json'
import floor from './floor.json'

// 使用mock创建接口
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})


//通过Mock对象模拟出虚拟数据
//Mock依赖包对外暴露的是一个Mock对象，这个对象提供的一个mock方法可以模拟数据
//参数:第一个参数  模块数据将来axios请求的地址   第二个参数:获取到的数据
//注意:项目当中发请求的接口
//第一种:真实服务器接口 http://39.98.123.211/api/list/xx 
//第二种:mock出来数据接口xxx/mock/banner
//路径当中出现/api 真实接口    /mock 模拟数据
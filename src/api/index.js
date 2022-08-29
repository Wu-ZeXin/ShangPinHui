// 该模块：对API进行统一管理

// 引入二次封装的axios
import requests from './request'

// 引入引入二次封装的mock-axios
import mockRequests from './mockRequest'

// TypeNav组件(三级联动)的接口
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'})

// 轮播图数据
export const reqBannerList = () => mockRequests({url:'/banner',method:'get'})

// floor组件数据
export const reqFloorList = () => mockRequests({url:'/floor',method:'get'})

// 获取搜索数据
export const reqSearchList = (data) => requests({url:'/list',method:'post',data})

// 获取商品详情数据
export const reqDetailList = (skuId) => requests({url:`/item/${ skuId }`,method:'get'})

//添加到购物车(对已有 物品进行数量 改动)
///api/cart/addToCart/{ skuId }/{ skuNum }  post
export const reqAddOrUpdateShopCartList = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车列表数据
export const reqShopCart = () => requests({url:'/cart/cartList',method:'get'})

// 更改商品是否选中状态
export const reqUpdateCartChecked = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 删除商品
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 获取验证码
export const reqCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 用户注册
export const reqRegister = (phone,code,password) => requests({url: '/user/passport/register/', method: 'post', data:{phone, code, password}})

// 用户登录
export const reqLogin = (phone,password) => requests({url: '/user/passport/login', method: 'post', data:{phone, password}})

// 获取用户信息
export const reqUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'})

// 退出登录
export const reqLoginOut = () => requests({url: '/user/passport/logout', method: 'get'})

// 获取订单交易页信息
export const reqTradeCartList = () => requests({url: '/order/auth/trade', method: 'get'})

// 获取用户地址信息
export const reqUserAddressList = () => requests({url: '/user/userAddress/auth/findUserAddressList', method: 'get'})

// 提交订单
export const reqSubmitOrder = (tradeNo,data) => requests({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data})

// 获取支付信息
export const reqPayInfo = (orderId) => requests({url: `/payment/weixin/createNative/${orderId}`, method: 'get'})

// 请求订单页面信息
export const reqOrderInfo = (page,limit) => requests({url: `/order/auth/${page}/${limit}`, method: 'get'})

// 获取订单支付情况
export const reqPayStatus = (orderId) => requests({url: `/payment/weixin/queryPayStatus/${orderId}`,method: 'get'})
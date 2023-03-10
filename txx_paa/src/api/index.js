//api进行统一管理
import requests from "./request";


export const reqCategoryList = ()=>{
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}

//模拟接口
import mockRequests from './mockAjax'
//获取Home首页轮播图接口
export const reqGetBannerList = ()=>{
    return mockRequests.get('/banner')
}

export const reqFloorList = ()=>mockRequests.get('/floor')


//获取Search模块数据

export const reqGetSearchInfo = (params)=>requests({
    url:'/list',
    method:'post',
    data:params
})

//获取产品详情接口

export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})

//将产品添加到购物车中（获取更新某一个产品的个数）
// /cart/addToCart/skuId/skuNum   post
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})


//获取购物车列表数据接口

export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})

//删除购物车产品的接口

export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品选中状态

export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})


//获取验证码

export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册
// /user/passport/register  post 
export const reqUserRegister = (data) => requests({url:`/user/passport/register`,data,method:'post'})

//登录
//data key value 一致省略 value
export const reqUserLogin = (data) => requests({url:`/user/passport/login`,data,method:'post'})

//获取用户信息（需要用户的token向服务器要用户信息）

export const reqUserInfo = () => requests({url:`/user/passport/auth/getUserInfo`,method:'get'})

//退出登陆

export const reqLogout = () => requests({url:`/user/passport/logout`,method:'get'})

//获取用户地址信息
export const reqAddressInfo = () => requests({url:'user/userAddress/auth/findUserAddressList',method:'get'})

//获取订单交易信息清单
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})


//提交订单的接口
// url : /api/order/auth/submitOrder?tradeNo={tradeNo}

export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取支付信息

export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取支付订单状态

export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})


//获取订单接口

export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})
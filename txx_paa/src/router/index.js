import Vue from "vue";
import VueRouter from "vue-router";


//先把VueRouter原型对象的push，先保存一份    replace
let originPush = VueRouter.prototype.push;

let originReplace = VueRouter.prototype.replace;
//重写push|replace
//第一个参数：你往哪里跳转  第二个：成功的回调 第三个：失败的回调
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

Vue.use(VueRouter)

import routes from "./routes";
let router = new VueRouter({
    routes,
    scrollBehavior(to,from,savedPosition){
        //使得滚动条在最顶部
        return {y:0}
    }
})

export default router

import store from "@/store";


//全局守卫，前置守卫（在路由跳转前）
router.beforeEach(async (to,from,next)=>{

//用户登录才会有token,未登录一定没有
let token = store.state.user.token
//用户信息
// let userInfo = store.state.user.userInfo //它是空对象，是true的
let name =  store.state.user.userInfo.name 


    // to:可以获取跳转到那个路由
    // from：可以获取从那个路由来
    // next:放行函数 next() next(path) 放行到指定路由       next(false)
    if(token){  
        //用户已经登录 不能去login了 去首页
        if(to.path=='/login'){
            next('/')
        }else{
            //登录了但去的不是login
            if(name){
                //有用户信息放行
                next()
            }else{
                // 没有就派发actions让仓库存储用户信息在跳转
                try {
                    //获取用户信息 成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token 失效了 获取不到用户信息  （时间长了）
                    //清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
            
        }
    }else{
        // 未登录 不能去交易相关的、支付相关的、不能去个人中心
        let toPath = to.path 
        if(toPath == '/trade' || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
            // 把未登录想去没去成的信息，存储与地址栏（路由中） 看Login组件中的userLogin函数处理
            next('/login?redirect='+toPath)
        }else{
            next()
        }
        
    }

    
})
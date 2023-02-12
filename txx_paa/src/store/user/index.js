//登录与注册
import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api"

import { setToken } from "@/utils/token"
const actions = {
    //获取验证码
    async getCode({commit},phone){
       let result = await reqGetCode(phone)
       if(result.code == 200){
        commit('GETCODE',result.data)
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
    },
    //注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        //服务器下发token，用户唯一标识
        //客户端用来带token找服务器要用户信息

        //vuex 存储不是持久化的
        if(result.code == 200){
            commit('USERLOGIN',result.data.token)
            //持久化本地存储token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }

    },
    //退出登录
    async userLogout({commit}){
        //通知服务器清除token
        let result = await reqLogout()
        if(result.code == 200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }


}

const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //清除本地用户相关信息
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem('TOKEN')
    }
}

const state = {
    code : '',
    token :localStorage.getItem('TOKEN'),
    userInfo:{},
}

const getters = {}

export default{
    actions,
    mutations,
    state,
    getters
}
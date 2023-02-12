import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"

const actions = {
    //获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
       let result = await reqDeleteCartById(skuId)
       if(result.code == 200){
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
    },
    //修改购物车某一产品选中状态
    async UpdateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
           }else{
            return Promise.reject(new Error('faile'))
           }
    },
    //删全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
           let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId',item.skuId):''
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
    //修改全部选框状态
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
          let promise = dispatch('UpdateCheckedById',{skuId:item.skuId,isChecked:isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}

const state = {
    cartList:[]
}

const getters = {
    //获取个人购物车数据
    cartList(state){
        return state.cartList[0] || {}
    },
    // cartInfoList(){
    //     return 
    // }
}

export default{
    actions,
    mutations,
    state,
    getters
}
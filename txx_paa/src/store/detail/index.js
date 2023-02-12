import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
//封装游客身份模块uuid--》生成一个随机字符串（不变）
import {getUUID} from '@/utils/uuid_token'
const actions = {
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    },
    //将产品添加的购物车||修改某一个产品个数
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
         let result = await reqAddOrUpdateShopCart(skuId,skuNum)
         if(result.code == 200){
            // console.log(skuId,skuNum);
            return 'ok'
         }else{
            return Promise.reject(new Error('faile'))
         }
        
    }
   
}

const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    },

}

const state = {
    goodInfo : {},
    //游客临时身份
    uuid_token:getUUID()
}

const getters = {
    categoryView(state){
        // ||{} 避免假报错
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default{
    actions,
    mutations,
    state,
    getters
}
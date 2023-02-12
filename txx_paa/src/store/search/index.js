import { reqGetSearchInfo } from "@/api"
const actions = {
    async getSearchList({commit},params={}){
        //当前这个函数在调用获取服务器数据的时候,至少传递一个参数（空对象）
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}

const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}

const state = {
    searchList : {}
}
//计算属性  作用：简化仓库中的数据
const getters = {
    goodsList(state){
        //假如网络不给力，返回的就是undefined
        //我们给他一个空数组    
        return state.searchList.goodsList || []
    },
    trademarkList(){
        return state.searchList.trademarkList || []
    },
    attrsList(){
        return state.searchList.attrsList || []
    }
}

export default{
    actions,
    mutations,
    state,
    getters
}
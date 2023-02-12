import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api"

//home模块的小仓库
const actions = {

        async categoryList({commit}){
            let result = await reqCategoryList();
            if(result.code == 200){
                commit('CATEGORYLIST',result.data)
            }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        // console.log(commit);
        if(result.code == 200){
            commit('GETBANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code == 200){
            commit('GETFLOORLIST',result.data)
        }

    }
}


const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}

const state = {
    //三级菜单数据
    categoryList:[],
    //轮播图数据
    bannerList:[],
    
    floorList:[]
}

const getters = {}

export default{
    actions,
    mutations,
    state,
    getters
}
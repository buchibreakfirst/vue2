//对axios进行二次封装
import axios from "axios";

//引入进度条
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

//在当前模块引入store
import store from "@/store";

//创建实例
const requests = axios.create({
    //基础路径，发请求的时候，路径中会出现api
    baseURL:"/api",
    //请求超时的时间
    timeout:5000,
})
//请求拦截器：在发请求之前，请求拦截器可以检查到，可以在请求发出去之前做一些事
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        //给请求头添加一个字段(userTempId)，和后端商量好的
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }


    //进度条开始
    nprogress.start()
    return config
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('faile'))
})

export default requests;
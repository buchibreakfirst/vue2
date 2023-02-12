//路由配置信息
import Home from '../pages/Home'
import Search from '../pages/Search' 
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
// 当打包构建应用时，javascript包会变得非常大，影响页面加载
// 如果我们能把不同的路由组件分割成不同的代码块，然后让路由被访问时才加载对应组件，这样就高效了
// import Center from '@/pages/Center' //使用路由懒加载
//Center的二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default [
    {
        name:'center',
        path:'/center',
        component:()=>import('@/pages/Center'), //访问这个页面才开始加载
        meta:{show:true},
        children:[{
            name:'myorder',
            path:'myorder',
            component:MyOrder
        },
        {
            name:'grouporder',
            path:'grouporder',
            component:GroupOrder
        },
        {
            path:'/center',
            redirect:'/center/myorder'
        }
    
    ],

    },
    {
        name:'paysuccess',
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true}
    },
    {
        name:'pay',
        path:'/pay',
        component:Pay,
        meta:{show:true},
        beforeEnter:(to, from, next) => {
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name:'trade',
        path:'/trade',
        component:Trade,
        meta:{show:true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面必须从购物车来
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false) //从那来去哪去  
            }
        }
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        name:'addcartsucess',
        path:'/addcartsucess',
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        name:'home',
        path:'/home',
        component:Home,
        meta:{show:true}
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component:Search,
        meta:{show:true}
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        path:'/detail/:skuid',
        component:Detail,
        meta:{show:true}
    },
    //重定向，在项目跑起来的时候，立马到首页
    {
        path:'*',
        redirect:'/home'
    },


]
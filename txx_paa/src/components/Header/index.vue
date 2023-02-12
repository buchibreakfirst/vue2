<template>
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
          <div class="container">
              <div class="loginList">
                  <p>商品汇欢迎您！</p>
                  <p v-if="!userName">
                    <!-- 没有用户 -->
                      <span>请</span>
                      <router-link to="/login">登录</router-link>
                      <router-link to="register" class="register">免费注册</router-link>
                  </p>
                  <!-- 登录了 -->
                  <p v-else>
                    <a>{{ userName }}</a>
                    <a class="register" @click="logout">退出登录</a>
                  </p>
              </div>
              <div class="typeList">
                <router-link :to="{name:'myorder'}">我的订单</router-link>
                <router-link to="/shopcart">我的购物车</router-link>
                  <a href="###">我的商品汇</a>
                  <a href="###">商品汇会员</a>
                  <a href="###">企业采购</a>
                  <a href="###">关注商品汇</a>
                  <a href="###">合作招商</a>
                  <a href="###">商家后台</a>
              </div>
          </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
          <h1 class="logoArea">
              <router-link class="logo" title="商品汇" to="/home">
                  <img src="./images/logo.png" alt="">
              </router-link>
          </h1>
          <div class="searchArea">
              <form action="###" class="searchForm">
                  <input type="text" id="autocomplete" v-model="keyword" class="input-error input-xxlarge" />
                  <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
              </form>
          </div>
      </div>
  </header>
</template>

<script>
export default {
    name:'',
    data(){
        return {keyword:''}
    },
    computed:{
        userName(){
            return this.$store.state.user.userInfo.name 
        }
    },
    methods:{
        goSearch(){
            //面试题
            //1:路由跳转传参的时候path不可以结合params参数一起使用   只能name和params一起使用
            //2：如何指定params参数可传可不传？  如果路由要求传递params参数，但是如果没有传，URL就会出现问题 
            //在配置路由的时候，在占位的后面加上一个“？”【params参数就可传可不传】
            //3:params参数可以传递也可以不传递，但是如果传递的是空串，如何解决？ 
            //使用undefined解决    params：{keyword:''||undefined}
            //4:路由组件可传递props参数有三种方法 1对象 2布尔值 3函数  
            let location = {name:'search',
                params:{
                    keyword:this.keyword || undefined
                },
                // query:this.$route.query
            }
            if(this.$route.query){
                location.query = this.$route.query
            }
            this.$router.push(location)
            //编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicatd的警告错误
            //通过给push方法，传递相应的成功、失败的回调函数可以捕获到当前错误，可以解决.  --治标不治本
        },
        //退出登录
        async logout(){
            try {
                await this.$store.dispatch('userLogout')
                //返回首页
                this.$router.push('/home')
            } catch (error) {
                alert(error.message)
            }
        },

    },
    mounted(){
        //通过全局事件总线清除关键字
        this.$bus.$on('clear',()=>{
            this.keyword = ''
        })
    }
}
</script>
<style scoped lang="less">
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>
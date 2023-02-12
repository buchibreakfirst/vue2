<template>
  <div>
    <!-- 引用三级联动全局组件 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor) in floorList" :key="floor.id" :floor="floor"/>
    <Bran/>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Bran from './Bran'
import { mapState } from 'vuex'
export default {


  components:{ListContainer,Recommend,Rank,Like,Floor,Bran},
  computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    },
  mounted(){
    this.$store.dispatch('getFloorList')
        //获取用户信息在首页展示
        this.$store.dispatch('getUserInfo')

  }

}
</script>

<style>

</style>
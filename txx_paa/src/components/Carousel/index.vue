<template>
    <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
            <img :src="carousel.imgUrl">
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name:'Carousel',
    props:['list'],
    watch:{
        list:{
            immediate:true,
            handler(){
                this.$nextTick(()=>{
                    var mySwiper = new Swiper (this.$refs.cur, {
                                // direction: 'vertical', // 垂直切换选项
                                loop: true, // 循环模式选项
                                // autoplay:true,//等同于以下设置
                            /*autoplay: {
                                delay: 3000,
                                stopOnLastSlide: false,
                                disableOnInteraction: true,
                                },*/
                                // 如果需要分页器
                                pagination: {
                                el: '.swiper-pagination',
                                clickable:true //点击小球也切换图片
                                },
                                
                                // 如果需要前进后退按钮
                                navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                                },
                                
                                // 如果需要滚动条
                                scrollbar: {
                                el: '.swiper-scrollbar',
                                
                                },
                            }) 
                })
            }
        }
    }

}
</script>

<style>

</style>
<template>
  <div class="swiper-container" ref="CarouselSwiper">
    <div class="swiper-wrapper" >
        <div class="swiper-slide" v-for="(item,index) in bannerList" :key="item.id">
          <img :src="item.imgUrl"> 
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
import Swiper from 'swiper'

export default {
  name:'Carousel',
  props:['bannerList'],

  watch:{
    bannerList:{
      //监听属性：立即监听，不管属性有没有发生变化，立即执行一次。
      immediate:true,
      handler() {
        //监听到属性变化，立即初始化swiper实例
        this.$nextTick(()=>{
          //回调里面写代码的时候:1:服务器数据回来了 2:v-for执行完毕，结构已经有了
            new Swiper (this.$refs.CarouselSwiper, {

              loop: true, // 循环模式选项
              
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
              
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              
            })        
        })
      }
    }
  } 
}
</script>

<style scoped>

</style>
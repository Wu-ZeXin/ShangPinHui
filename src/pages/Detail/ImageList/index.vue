<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage, index) in imagesList"
        :key="skuImage.id"
      >
        <img
          :src="skuImage.imgUrl"
          @click="changeIndex(index)"
          :class="{ active: currentIndex == index }"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",

  data() {
    return {
      currentIndex: 0,
    };
  },

  props: ["imagesList"],

  watch: {
    imagesList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.cur, {
            loop: false, // 循环模式选项
            //设置图片同时展示几个（slider）
            slidesPerView: 5,
            //设置每一次切换，切换几张图
            slidesPerGroup: 2,
            //滚动滚轮切换
            mousewheel: true,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },

  methods: {
    changeIndex(index) {
      this.currentIndex = index;
      this.$bus.$emit("send", index);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      /* &:hover {
          border: 2px solid #f60;
          padding: 1px;
        } */
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
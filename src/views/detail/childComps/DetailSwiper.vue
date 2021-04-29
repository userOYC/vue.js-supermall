<template>
  <div class="detail-swiper">
    <swiper class="swiper-img-height">
      <swiper-item v-for="(item,index) in topimages" :key="index">
        <img :src="item" alt="" class="detailswiperimg">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper,SwiperItem } from 'components/common/swiper/index'


export default {
  components:{
    Swiper,
    SwiperItem
  },

  props:{
    topimages:{ //接收Detail传来的轮播图数据
      type:Array,
      default(){
        return []
      }
    }
  },
}
</script>

<style>
.detailswiperimg{
  width: 100%;
}
.swiper-img-height{
  overflow: hidden;
  height: 350px;
}
</style>
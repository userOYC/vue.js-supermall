<template>
    <swiper class="homeswiper">
      <swiper-item v-for="(item,index) in banner" :key="index"> 
        <a :href="item.link"> <!-- 动态绑定链接 -->
          <img :src="item.image" alt="" @load="imgload" class="homeswiper"> <!-- 动态绑定图片 -->
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  components:{
    Swiper,
    SwiperItem
  },

  data(){
    return {
      isload:true //记录发送img监听的状态
    }
  },

  props:{
    banner:{ //接收Home.vue传来的banner数据
      type:Array,
      default(){
        return []
      }
    }
  },

  methods:{
    imgload(){ //向Home.vue发送img监听事件
      if(this.isload) {
        this.$emit('swiperimgload');
        this.$bus.emit('swiperimgload')
        this.isload = false //只需要知道一张轮播图加载完成就可以知道高度
      }
    }
  }
}
</script>

<style>
</style>
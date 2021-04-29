<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot> <!-- 使用只需要套一层scroll标签，内容替换插槽--> 
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'
BScroll.use(ObserveDOM)
BScroll.use(ObserveImage)

export default {
  props:{
    probeType:{ //接收来自Home.vue传来的probeType
      type:Number,
      default:0
    },
  },

  data(){
    return {
      scroll:null,
      message:'我是scroll组件'
    }
  },
  mounted(){
    /*需要在实例被挂载之后创建，不然拿不到DOM元素 */
    /* 1.创建scroll对象 */
    this.scroll = new BScroll(this.$refs.wrapper,{ // this.$refs.wrapper拿到wrapper盒子
      probeType:this.probeType, //实时监听滚动，动态设置是否需要实时监听，由Home传入参数
      pullUpLoad:{threshold:0}, //pullUpLoad:true 则 threshold值为0
      click:true, //better-scroll内部开启click事件 ，默认值为false
      // observeDOM: true, // 当有DOM元素发送变化时调用scroll的refresh方法，重新计算可滚动高度
      mouseWheel: true,//开启鼠标滚轮
      disableMouse: false,//启用鼠标拖动
      disableTouch: false,//启用手指触摸
      observeImage: true //加载图片的时候，无论图片的加载成功与否，都会自动调用 BetterScroll 的 refresh 方法来重新计算可滚动的宽度或者高度
    })

    /* 2.监听滚动 */
    this.scroll.on('scroll',position => { //scroll事件
      this.$emit('scroll',position) //监听的滚动不是在scroll组件中发生，而是谁需要该功能。发送自定义事件scroll，并把position参数传出去，使外界可以使用监听滚动
    })

    /* 3.滚动指定距离之后触发回调 */
    this.scroll.on('pullingUp', () => { //pullingUp事件 ，当距离滚动到底部小于 pullUpLoad设置的threshold 值时，触发一次 pullingUp 事件且只会触发一次
      // console.log('上拉加载更多');
      this.$emit('pullingUp') //发送上拉加载更多事件
    })
  },

  methods:{

  }
}
</script>

<style>
</style>
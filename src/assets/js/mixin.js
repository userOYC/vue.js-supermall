/* 实现混入 */
import BackTop from 'components/common/backtop/BackTop'

export const mixinBackTop = { //BackTop回到顶部按钮的混入
  components: {
    BackTop
  },
  // <back-top @click="backtopclick" v-show="isshow"></back-top>
  data() {
    return {
      isshow: false, //回到顶部按钮的状态
    }
  },

  methods: {
    backtopclick() { //点击回到顶部
      // console.log(this.$refs.scroll); /* 拿到scroll组件对象 */
      this.$refs.scroll.scroll.scrollTo(0, 0, 350) /* 调用scroll组件中的scroll对象中内置的scrollTo方法 前两个参数是位置，后一个是完成时间*/
    },
  }
}
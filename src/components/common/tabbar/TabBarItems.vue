<template>
  <div class="tab_bar_items" @click="tabbaritemsclick">
    <!-- 具名插槽，动态决定显示   icon是图片，text是文字 -->
    <div v-if="!isActive"> <slot name="item_icon"></slot> </div>
    <div v-else> <slot name="item_icon_active"></slot> </div>
    <div :class="{active:isActive}"> <slot name="item_text"></slot> </div>
  </div>
</template>

<script>
// 该文件封装底部tabbar的items子元素
export default {
  props:{
    path:{ // 接收来自App.vue中的path值
      type:String
    }
  },

  data(){
    return {

    }
  },
  
  computed:{
    isActive(){ //动态决定isActive的值
    /* $route拿到当前活跃状态的路由，使用indexOf判断动态path路径是否和当前活跃状态路由的路径一致，不等于-1则表示一致，返回true */
      return this.$route.path.indexOf(this.path) !== -1;
    }
  },

  methods:{
    tabbaritemsclick(){ //点击跳转路由
    /* 点击跳转的路径是动态的，设置props接收动态路径 */
      this.$router.replace(this.path)
    }
  }

}
</script>

<style>
/* 这里不能加scoped  否则img影响不到其他文件下的元素 因为插槽的缘故*/
.tab_bar_items{
  text-align: center;
  flex: 1;
  height: 49px; /* 不能加line-height */
  font-size: 14px;
}
.tab_bar_items img {
  width: 22px;
  height: 22px;
  margin-top: 5px;
  margin-bottom: 3px;
}
.active{
  color: red;
}
</style>
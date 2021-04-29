<template>
  <div class="main-tab-bar">
        <tab-bar>
      <!-- 此处只需要把指定字符串传给TabBarItems实现跳转，所以不需要动态绑定 不加: -->
      <tab-bar-items path="/home"> 
        <template #item_icon> <img src="~assets/img/tabbar/home.svg" alt=""> </template>
        <template #item_icon_active> <img src="~assets/img/tabbar/home_active.svg" alt=""> </template>
        <template #item_text> <div>首页</div> </template>
      </tab-bar-items>

      <tab-bar-items path="/category">
        <template #item_icon> <img src="~assets/img/tabbar/category.svg" alt=""> </template>
        <template #item_icon_active> <img src="~assets/img/tabbar/category_active.svg" alt=""> </template>
        <template #item_text> <div>分类</div> </template>
      </tab-bar-items>
      <tab-bar-items path="/cart">
        <template #item_icon> <img src="~assets/img/tabbar/shopcart.svg" alt=""> </template>
        <template #item_icon_active> <img src="~assets/img/tabbar/shopcart_active.svg" alt=""> </template>
        <template #item_text> <div>购物车</div> </template>
      </tab-bar-items>

      <tab-bar-items path="/profile">
        <template #item_icon> <img src="~assets/img/tabbar/profile.svg" alt=""> </template>
        <template #item_icon_active> <img src="~assets/img/tabbar/profile_active.svg" alt=""> </template>
        <template #item_text> <div>我的</div> </template>
      </tab-bar-items>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from './TabBar'
import TabBarItems from './TabBarItems'
export default {
    components:{
    TabBar,
    TabBarItems
  }
}
</script>

<style>

</style>
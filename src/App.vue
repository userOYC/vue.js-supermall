<template>
  <div id="app">

   <router-view v-slot="{ Component }">
     <keep-alive exclude="Detail">
       <component :is="Component" />
     </keep-alive>
   </router-view>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/common/tabbar/MainTabBar'
export default {
  name:'App',
  components:{
    MainTabBar
  }
}
</script>

<style>
/* 引入基本css样式 */
  @import "./assets/css/base.css";
</style>

<template>
  <div id="tab_bar">
    <slot></slot>
  </div>
</template>

<script>
// 封装tabbar底部模块
export default {
  name:'TabBar'
}
</script>

<style>
#tab_bar{
  font-size: 16px;
  display: flex;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  height: 49px;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
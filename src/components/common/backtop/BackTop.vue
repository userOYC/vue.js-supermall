<template>
<div class="back-top">
  <img src="~assets/img/common/top.png" alt="">
</div>
</template>

<script>
export default {
  name:'BackTop'
}
</script>

<style>
.back-top{
  position: fixed;
  right: 15px;
  bottom: 65px;
  z-index: 999;
}
.back-top img {
  width: 50px;
}
</style>
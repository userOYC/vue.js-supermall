<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0; */
      /* border-bottom: 1px solid #ccc; */
    box-shadow: 0 1px 1px 1px rgba(100, 100, 100, .1);
  }

  .left {
    width: 60px;
  }

  .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>
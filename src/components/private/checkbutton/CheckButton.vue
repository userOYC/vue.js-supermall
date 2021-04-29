<template>
  <div class="check-button" :class={check:ischecked}>
    <img src="~assets/img/cart/tick.svg" alt="" class="check-button-img">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  props:{ //接收cartbottombar传来的勾选状态的值
    ischecked:{
      type:Boolean,
      default:false
    }
  }
  
}
</script>

<style>
.check-button{
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 2px solid #aaa;
}
.check-button-img{
  width: 100%;
}
.check{
  border-color: red;
  background-color: red;
}
</style>
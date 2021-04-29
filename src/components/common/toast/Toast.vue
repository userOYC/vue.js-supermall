<template>
<!-- 全局弹窗 -->
  <div class="toast" v-show="isshow">
    {{message}}
  </div>
</template>

<script>
export default {
  name:'Toast',
  data(){
    return {
      message:'加入购物车成功',
      isshow:false
    }
  },
  methods:{
    show(message,duration = 1500) {
      this.isshow = true;
      this.message = message;

      setTimeout(()=>{
        this.isshow = false;
        this.message = ''
      },duration)
    }
  }
}
</script>

<style>
.toast{
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color:rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  color: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  padding: 5px 10px;
  z-index: 999;
}
</style>
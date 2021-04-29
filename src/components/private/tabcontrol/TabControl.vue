<template>
  <div class="tabcontrol">
    <div v-for="(item,index) in title" :key="index" class="tabcontrol-items" @click="tabcontrolitemsclick(index)" :class="{active:currentindex===index}" >
      <span class="tabcontrol-span">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{ //接收Home.vue传来的title
      type:Array,
      default(){
        return []
      }
    }
  },

  data(){
    return {
      currentindex:0
    }
  },

  methods:{
    tabcontrolitemsclick(index){
      this.currentindex = index;
      this.$emit('tabclick',index) /* 发送自定义事件，传给Home.vue的tabcontrol */
    }
  }
}
</script>

<style>
.tabcontrol {
  display: flex;
  text-align: center;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  z-index: 9;
}
.tabcontrol-items {
  flex: 1;
}
.tabcontrol-span {
  padding: 8px 8px 6px 8px;
}
.active {
  color: red;
}
.active span{
  border-bottom: 2px solid red;
}
</style>
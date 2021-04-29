<template>
  <div class="recommend">
    <div v-for="(item,index) in recommend" :key="index" class="recommend-items">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    recommend:{ //接收Home.vue传来的recommend推荐数据
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
.recommend{
  display: flex;
  width: 100%;
  font-size: 14px;
  text-align: center;
  padding: 10px 0 15px;
  border-bottom: 8px solid #eee;
}
.recommend-items{
  flex: 1;
}
.recommend-items img {
  width: 85%;
  margin-bottom: 10px;
}
</style>
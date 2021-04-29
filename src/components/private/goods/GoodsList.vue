<template>
<div id="goods-list">
  <goods-list-item v-for="(item,index) in goods" :key="index" :goodsitem="item"></goods-list-item> <!-- 从goods中取出item传给goodslistitem-->
</div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name:'GoodsList',
  components:{
    GoodsListItem
  },
  props:{
    goods:{ //接收使用该组件传来的数据
      type:Array,
      default(){
        return[]
      }
    }
  }
}
</script>

<style>
#goods-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* margin-top: 5px; */
  background-color: #fff;
}
</style>
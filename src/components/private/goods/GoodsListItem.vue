<template>
<div id="goods-item">
  <img :src="showimage" alt="" class="imgclass-item" @click="imgclick" @load="goodsitemimg">
  <div class="goods-info">
    <p>{{goodsitem.title}}</p>
    <span class="price"> {{ goodsitem.price }}</span>
    <span class="collect"> {{ goodsitem.cfav }}</span>
  </div>
</div>
</template>

<script>

export default {
  name:'GoodsListItem',

  props:{
    goodsitem:{ //接收goodslist传来的数据
      type:Object,
      default(){
        return{}
      }
    }
  },

  methods:{
    imgclick(){
      // 将对应的id拼接并跳转路由
      this.$router.push('/detail' + this.goodsitem.iid)
    },

    goodsitemimg(){ //监听推荐图片加载 传给home
      this.$bus.emit('goodsitemimg')
    }
  },

  computed:{
    showimage(){ //每个模块内的推荐图片存放位置不一样
    /* 首页推荐中在goodsitem.show.img ,首页详情推荐在goodsitem.image,分类推荐在goodsitem.img*/
      return  this.goodsitem.img || this.goodsitem.image || this.goodsitem.show.img  
    }
  },

  // watch:{
  //   goodsitem(){
  //     console.log('111');
  //   }
  // }

  // created(){
  //   console.log(this.goodsitem);
  // }
}
</script>

<style>
  #goods-item {
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }

  .imgclass-item {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    font-size: 12px;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
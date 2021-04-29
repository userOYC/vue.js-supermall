<template>
  <div class="detail-bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div class="countparent" @click="$router.push('/cart')">
        <!-- <i class="icon shop"></i> -->
        <img src="~assets/img/detail/cart.svg" alt="" class="shop">
        <div class="count">{{vuexStateCartlistLength}}</div>
        <span class="text">购物车</span>
      </div>
      <div class="collect">
        <!-- <i class="icon select"  @click="textclick" ></i> -->
        <img src="~assets/img/detail/collect.svg"  @click="textclick" alt=""  v-if="isActive">
        <img src="~assets/img/detail/collect_active.svg"  @click="textclick" alt="" v-else>
        <span class="text" >收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="cartclick">加入购物车</div>
      <!-- 点击购买跳转到购物车页面 -->
      <div class="buy" @click="$router.push('/cart')">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailBottomBar',
  
  data(){
    return {
      isshow:true,
      isActive:true
    }
  },
   computed:{
    vuexStateCartlistLength(){ //获得vuex中state中的cartlis数组的length
      return this.$store.state.cartlist.length
    },
  },
  methods:{
    cartclick() { //点击加入购物车，向外组件发送事件
      this.$emit('joincart')
    },
    textclick(){ //收藏店铺
      this.isActive = !this.isActive
      if(!this.isActive) {
         this.$toast({
           message: `收藏成功`,
           forbidClick: true,
           duration: 1500
        });
      }
    }
  }
}
 
</script>

<style scoped>
  .detail-bottom-bar {
    height: 52px;
    background-color: #fff;
    text-align: center;

    position: fixed;
    left: 0;
    right: 0;
    bottom: -2px;
    
    display: flex;
  }
  .countparent{
    position: relative;
  }
  .countparent .count{
    width: 16px;
    height: 16px;
    background-color: red;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 15px;
  }
  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }
  .collect img,.shop{
    display: block;
    width: 22px;
    height: 22px;
    margin: 7px auto 3px;
  }
  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 7px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position:0 -54px;
  }

  .bar-left .shop {
    background-position:0 -98px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }

  .sport-ball {
    position: absolute;
    left: 225px;
    bottom: 20px;
  }
</style>

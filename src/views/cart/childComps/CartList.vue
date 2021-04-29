<template>
  <!-- 购物车中有数据 -->
  <div class="cartlist" v-if="cartlist!=0" ref="cartlist">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartlist" :key="index" :iteminfo="item">{{item}}</cart-list-item>
    </scroll>
  </div>
  <!-- 购物车中没数据 -->
  <div v-else class="elsecart">
    <div class="elseimg"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F0f9fcafc91fba37048f075319220261f54ae977e16686-tahVyj_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622209517&t=a92fc822adf8929b672b9a680cfdc92e" alt=""></div>
    <div class="empty">购物空空如也，快去选购中意好货吧~</div>
    <button  @click="$router.push('/category')">逛逛今日特卖</button>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
import Scroll from 'components/common/scroll/Scroll'

export default {
  name:'CartList',
  components:{
    CartListItem,
    Scroll
  },
  computed:{
    cartlist(){ 
      return this.$store.state.cartlist
    }
  },

  activated(){
    if(this.$refs.cartrlist)  this.$refs.scroll.scroll.refresh()
  }
}
</script>

<style scoped>
.cartlist{
  height: calc(100% - 44px - 49px - 40px); /* 计算滚动高度 */
}
.content{
  overflow: hidden;
  height: 100%; /* 计算滚动高度 */
}
.elsecart {
  height: calc(100% - 44px - 49px - 40px);
  position: relative;
}
.elsecart .elseimg {
  height: 290px;
  overflow: hidden;
}
.elsecart .elseimg img{
  padding-left: 40px;
  width: 350px;
  /* height: 350px; */
}
.elsecart .empty {
  width: 300px;
  font-size: 16px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translateX(-40%);
}
.elsecart button{
  width: 110px;
  height: 35px;
  font-size: 14px;
  border: 1px solid red;
  color: red;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
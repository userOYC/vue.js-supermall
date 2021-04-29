<template>
  <div class="cart">
    <nav-bar class="cartnavbar">
      <template v-slot:center>购物车({{vuexStateCartlistLength}})</template>
      <template v-slot:right>
        <div v-if="changeisshow" @click="isshowclickone">管理</div>
        <div v-else @click="isshowclicktwo">完成</div>
      </template>
    </nav-bar>
      <cart-list></cart-list>
      <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartBottomBar from './childComps/CartBottomBar'
import CartList from './childComps/CartList'
export default {
  components:{
    NavBar,
    CartBottomBar,
    CartList
  },

  data(){
    return{
      isshow:''
    }
  },

  computed:{
    vuexStateCartlistLength(){ //获得vuex中state中的cartlis数组的length
      return this.$store.state.cartlist.length
    },
    changeisshow(){ // 获取isshow状态
       return this.$store.state.isshow
    },
  },

  methods:{
    isshowclickone(){ //改变管理isshow状态
      this.$store.commit('changeisshow')
    },
    isshowclicktwo(){  //改变管理isshow状态
      this.$store.commit('changeisshow')
    }
  },

  updated(){ //由于数据更改导致的虚拟 DOM 重新渲染和打补丁，会调用该钩子。
    this.isshow = this.$store.state.isshow
  }
}
</script>

<style scoped>

.cartnavbar{
  font-size: 16px;
  background-color:var(--color-tint);
  color: #fff;
}
.cart{
  width: 100%;
  height: 100vh;
}
</style>
<template>
  <div class="cart-bottom-bar">
    <!-- 全选 -->
    <div class="checkall">
      <check-button :ischecked="isselectall"  class="check-button" @click="checkbuttonclick"></check-button>
     <span>全选</span>
    </div>
    <!-- 合计 -->
    <div class="total"  v-if="changeisshow">
     合计:<i>{{toprice}}</i>
    </div>
    <!-- 去计算 -->
    <div class="calculate" @click="calcuclick" v-if="changeisshow">
      去支付({{checklength}})
    </div>
    <div class="calculate" v-else @click="removecartlist">移除</div>
  </div>
</template>

<script>
import CheckButton from 'components/private/checkbutton/CheckButton'
import { Dialog } from 'vant';

export default {
  name:'CartBottomBar',
  components:{
    CheckButton,
    [Dialog.Component.name]: Dialog.Component,
  },
  props: {
    iteminfo: Object, //接受cartlist传来的item
    default(){
      return {}
    }
  },
  data(){
    return {
      item:''
    }
  },
  computed:{
    cartlist(){ //获得vuex中state中的cartlis数组
      return this.$store.state.cartlist
    },
    toprice(){ //计算总价
      return '￥' + this.cartlist.filter(item => {
        return item.checked //返回checked为true的数据(选中的商品)
      }).reduce((prevalue,item) => { //根基选中的商品计算总价
        return (prevalue + item.price * item.count) //累加价格
      },0).toFixed(2)
    },
    checklength(){ //去支付商品个数
      return this.cartlist.filter(item => item.checked).length
    },
    isselectall() { //商品状态与全选按钮的关系，将状态传给checkButton
      /* 2.使用find函数  用find函数查找不选中的状态，查找到了false就返回false ，并且当cartlist中没有数据的时候，默认返回false*/
      if(this.cartlist.length === 0) { //没有商品数据时状态为false
        return false
      } else { 
        return !this.cartlist.find(item => !item.checked)
      }
    },
    changeisshow(){ // 获取管理isshow状态
       return this.$store.state.isshow
    }
  },
  methods:{
    checkbuttonclick() { //全选与反选
      if(this.isselectall){ /* isselectall有数据时默认为true */
        this.cartlist.forEach(item => item.checked = false)
      } else {
        this.cartlist.forEach(item => item.checked = true)
      }
    },
    calcuclick(){ //提示弹窗
      if(this.isselectall){ //如果有状态为勾选的商品
       this.$dialog
          .confirm({
            title: "温馨提示",
            message: "您确定要提交订单吗?"
          })
          .then(() => {
            this.$toast({
              type: "success",
              message: `支付成功`,
              forbidClick: true,
              duration: 800
            });
            // 清除选中商品
            setTimeout(() => {
              this.$store.commit("removecartlist")
              this.$dialog.close
            }, 500);
          })
          .catch(err => err);
      } else { //如果没有勾选的商品，则提示添加商品
        this.$toast({
          type: "fail",
          message: `您还没有选中商品哦`,
          forbidClick: true,
          duration: 1500
        });
      }
    },
    removecartlist(){ //移除选中商品
      this.$store.commit('removecartlist')
    }
  },
}
</script>

<style>
.cart-bottom-bar{
  height: 40px;
  position: fixed;
  display: flex;
  justify-content:space-between;
  left: 0;
  right: 0;
  bottom: 49px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
  font-size: 18px;
}
.checkall{
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.check-button{
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
}
.total{
  margin-right: -70px;
  font-size: 16px;
}
.elsecalculate{
  margin-right: 10px;
}
.total i {
  font-style: normal;
  color: red;
  font-size: 15px;
}
.calculate{
  /* margin-right: 10px; */
  text-align: center;
  width: 100px;
  background-color: red;
  /* border-radius: 20px; */
  font-size: 15px;
  color: #fff;
}
</style>
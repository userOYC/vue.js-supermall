<template>
  <div id="shop-item">
      <!-- 勾选状态图片 -->
    <div class="item-selector">
      <check-button :ischecked="iteminfo.checked" @click="checkclick"></check-button>
    </div>

    <div class="item-img">
      <img :src="iteminfo.img" alt="商品图片">
    </div>

    <div class="item-info">
      <div class="item-title">{{iteminfo.title}}</div>
      <div class="item-desc">{{iteminfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{iteminfo.price}}</div>
        <!-- 商品数量 -->
        <div class="item-count right">
          <button @click="decrement" >-</button>
          <!-- :disabled="iteminfo.count <= 1" -->
          数量:{{iteminfo.count}}
          <button @click="pulsone">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/private/checkbutton/CheckButton'
export default {
  name:'CartListItem',
  components:{
    CheckButton
  },
  data(){
    return {
      localiteminfo:{}
    }
  },
  props: {
    iteminfo: Object, //cartlist传来的item
    default(){
      return {}
    }
  },
  methods:{
    checkclick(){ //点击改变商品勾选状态
      this.iteminfo.checked = !this.iteminfo.checked
    },
    decrement(){ //数量减一
    if(this.iteminfo.count = 1) {
      this.$dialog
          .confirm({
            title: "温馨提示",
            message: "是否删除该商品?"
          })
          .then(() => {
            this.$toast({
              type: "success",
              message: `删除成功`,
              forbidClick: true,
              duration: 1200
            });
            // 清除选中商品
            setTimeout(() => {
              this.$store.commit("removecartlist")
              this.$dialog.close
            }, 500);
          })
          .catch(err => err);
    }
      this.iteminfo.count--
    }, 
    pulsone(){ //数量加一
      this.iteminfo.count++
    }
  },
}
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    /* font-size: 0; */
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  /* .elseshopitem{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  } */
  .item-selector {
    /* width: 50px; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    width: 100%;
    height: 20px;
    overflow: hidden;
    white-space: pre-wrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    flex: 1;
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    /* font-size: 16px; */
    color: #ccc;
    margin-top: 15px;
  }

  .info-bottom {
    height: 30px;
    line-height: 30px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
  .item-count button{
    text-align: center;
    width: 30px;
    height: 30px;
  }
</style>
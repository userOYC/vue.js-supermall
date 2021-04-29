<template>
  <div>
    <nav-bar class="nav-bar" ref="detailnavbar">
      <template v-slot:left>
        <img src="~assets/img/common/back.svg" alt="" class="detail-img" @click="imgclick">
      </template>
      <template v-slot:center >
        
        <div class="detail-title">
          <div v-for="(item,index) in titles" :key="index" 
          class="detail-title-items" 
          @click="titleclick(index)"
          :class="{activeclass: index === currentindex}">
          <span>{{item}}</span>
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:'DetailTitle',
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentindex:0,
    }
  },
  methods:{
    titleclick(index){ //点击变色
      this.currentindex = index
      this.$emit('detailnavbarclick',index) // 给Detail发送事件，监听navbar的点击
    },
    imgclick(){ // 后退页面
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.nav-bar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 9;
}
.detail-title{
  display: flex;
  font-size: 16px;
}
.detail-title-items{
  flex: 1;
}
.activeclass {
  color: red;
}
.activeclass span{
  padding: 5px;
}
.detail-img{
  width: 20px;
  margin-top: 13px;
}
</style>
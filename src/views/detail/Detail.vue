<template>
  <div id="datail">
    <!-- 导航 -->
    <detail-nav-bar @detailnavbarclick="detailnavbarclick" ref="detailnavbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="detailscroll">
      <!-- 轮播图 -->
      <detail-swiper :topimages="topimages" class="detail-swiper"></detail-swiper>
      <!-- 信息展示 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品详情信息 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <!-- 商品参数信息 -->
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <!-- 评论 -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <!-- 推荐 -->
      <goods-list ref="goods" :goods="recommends"></goods-list>
    </scroll> 
    <!-- 购物车 -->
    <detail-bottom-bar @joincart="joincarts" :iid="iid" :goods="goods"></detail-bottom-bar>
    <back-top @click="backtopclick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar' /*导航栏 */
import DetailSwiper from './childComps/DetailSwiper' /*轮播图 */
import DetailBaseInfo from './childComps/DetailBaseInfo' /*商品 */
import DetailShopInfo from './childComps/DetailShopInfo' /*店铺 */
import DetailGoodsInfo from './childComps/DetailGoodsInfo' /*商品详细 */
import DetailParamInfo from './childComps/DetailParamInfo' /*商品参数 */
import DetailCommentInfo from './childComps/DetailCommentInfo' /*评论 */
import DetailBottomBar from './childComps/DetailBottomBar' /* 购物车 */

import Scroll from 'components/common/scroll/Scroll' /*better-scroll插件封装 */
import GoodsList from 'components/private/goods/GoodsList' /*推荐模块组件封装 */

import {mixinBackTop} from 'assets/js/mixin'

import {getdetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail' /*请求接口 */
export default {
  name:'Detail', /* 当使用keep-alive排除缓存时，排除的是该name值对应的组件 */
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },

  mixins:[mixinBackTop], //导入混入

  data(){
    return {
      iid:null, //对应的iid
      topimages:null, //请求的轮播图数据
      goods:{}, //请求的商品信息
      shop:{}, //请求的店铺信息
      detailInfo:{}, //请求的商品详情信息
      paramInfo:{}, //请求的参数信息
      commentInfo:{}, //请求的评论信息
      recommends:[], //请求的推荐信息
      titletop:[], //对应每个分类的offsetTop
      currentindex:0, //navbar的index

    }
  },

  created(){
    /* 1.保存id */
    this.iid = this.$route.params.iid; 
    /* 2.根据iid请求对应详情数据 */
    getdetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result; //变量接收，集中管理
      /* 3.得到轮播图数据 */
      this.topimages = data.itemInfo.topImages
      /* 4.得到商品信息 */
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services,data.shopInfo.name)
      /* 5.得到店铺信息 */
      this.shop = new Shop(data.shopInfo)
      /* 6.得到商品详细信息 */
      this.detailInfo = data.detailInfo
      /* 7.得到商品参数信息 */
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      /* 8.如果有评论信息则得到评论信息 */
      if(data.rate.cRate != 0) this.commentInfo = data.rate.list[0]
      // console.log(data.rate);
    })
    /* 9.获取详情页推荐数据 */
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
   },
   methods:{
     imageLoad(){ //当商品参数图片全部加载完之后再获取数据
      this.titletop = [] //先清空数组
      this.titletop.push(0)
      this.titletop.push(this.$refs.params.$el.offsetTop)
      this.titletop.push(this.$refs.comment.$el.offsetTop)
      this.titletop.push(this.$refs.goods.$el.offsetTop)
      this.titletop.push(Number.MAX_VALUE) //最大值
     },
     detailnavbarclick(index){ //根据index值点击移动到对应区域
     this.$refs.scroll.scroll.scrollTo(0,-this.titletop[index],200) //44是轮播图的margin-top:44PX
     },
     detailscroll(position){ //监听滚动 + 回到顶部
    //  console.log(position.y);
      const positionY = -position.y /* 获取Y值 */
      let length = this.titletop.length
      for(let i = 0 ; i < length - 1; i++) { //判断区间
      /* positionY和 titletop数组中的值对比 */
        if(this.currentindex !== i && (positionY >= this.titletop[i] && positionY < this.titletop[i + 1] )) {
          this.currentindex = i;
          this.$refs.detailnavbar.currentindex = this.currentindex //改变状态
        }
      }
      /* 回到顶部判断条件 */
      this.isshow = (-position.y) > 1000
     },
     joincarts(){ //加入购物车
       /* 1.获取需要展示信息 */
       const cartshow = {};//集中保存
       cartshow.img = this.topimages[0]; //获取展示图片，一张就行
       cartshow.title = this.goods.title //获取展示标题
       cartshow.desc = this.goods.desc; //获取商品描述
       cartshow.price = this.goods.realPrice; //获取商品价格
       cartshow.iid = this.iid; //获取商品iid，根据iid获取对应展示信息
       //调用vuex的mutations添加商品对象，且addtocart方法返回一个promise，我们就可以在外界得知vuex中的状态完成
       this.$store.dispatch('addtocart',cartshow).then(res =>{
          // this.$toast.show('该商品数量加一')
          this.$toast({
            type: "success",
            message: `商品数量加一`,
            forbidClick: true,
            duration: 1500
          });
       }).catch(err=>{
          // this.$toast.show('加入购物车成功')
          this.$toast({
            type: "success",
            message: `加入购物车成功`,
            forbidClick: true,
            duration: 1500
          });
       })
      //  console.log(cartshow)
     }
   },

   beforeUpdate(){
     this.$refs.scroll.scroll.refresh()
   }


}
</script>

<style>
#datail{
  position: relative; /* 盖上tabbar盒子 */
  z-index: 9;
  background-color: #fff;
  height: 100vh; /* calc中的100%是相对于父元素来设置，所以我们需要给父元素设置高度 */
}
.content{
  height: calc(100% - 44px - 50px); /* 计算滚动高度 */
}
.detail-swiper{
  margin-top: 44px;
}
</style>
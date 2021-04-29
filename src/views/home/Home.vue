<template>
  <div id="home"> 
    <!-- 标题栏 -->
    <nav-bar class="nav-bar"> <template #center>首页</template> </nav-bar>
    <!-- 解决吸顶效果克隆了一份-->
    <tab-control :title="['流行','新款','精选']" @tabclick="tabclick" ref="tabcontroltwo" v-show = isshowtabcontrol class="tabcontroltwo"></tab-control> 
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentscroll"  @pullingUp="loadmore"> <!-- 接收scroll组件传来的自定义事件scroll，给scroll组件传入参数3-->
      <!-- 轮播图 -->
      <home-swiper :banner="banner" @swiperimgload="swiperimgload"></home-swiper> <!-- 把banner数据传给HomeSwiper.vue-->
      <!-- 推荐 -->
      <recommend-view :recommend="recommend"></recommend-view>
      <!-- 特色 -->
      <feature-view></feature-view>
      <!-- 导航栏 -->
      <tab-control :title="['流行','新款','精选']" @tabclick="tabclick" ref="tabcontrolone"></tab-control> <!-- 把标题数据传给TabControl.vue-->
      <!-- 商品展示 -->
      <goods-list :goods="goods[currentindex].list" ></goods-list> <!-- 动态给goodslist传输数据-->
    </scroll>
    <!-- 回到顶部 -->
    <back-top @click="backtopclick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar' /* navbar标题栏 */
import TabControl from 'components/private/tabcontrol/TabControl' /* TabControl导航栏 */
import GoodsList from 'components/private/goods/GoodsList' /* 展示商品数据 */
import Scroll from 'components/common/scroll/Scroll' /* 封装的better-scroll */

import {getHomeMultidata,getHomeGoods} from 'network/home' /* 请求首页数据 */

import {mixinBackTop} from 'assets/js/mixin'


import HomeSwiper from './childComps/HomeSwiper' /* 封装的home轮播图 */
import RecommendView from './childComps/RecommendView' /* 封装的home推荐模块 */
import FeatureView from './childComps/FeatureView' /* 封装的Feature特色模块 */
export default {
  components:{
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView
  },

  mixins:[mixinBackTop], //导入混入

  data(){
    return {
      banner:null, // 轮播图模块数据
      recommend:null,//推荐模块数据
      goods:{ //商品数据
        'pop':{page:0,list:[]}, //流行
        'new':{page:0,list:[]}, //新款
        'sell':{page:0,list:[]}, //精选
      },
      currentindex:'pop',//请求商品的类型
      tabcontroloffsettop:0, //tabcontrol组件的顶部top值
      isshowtabcontrol:false, //tabcontrol吸顶效果的条件
      savey:0, //离开该组件时已滚动的Y值
    }
  },

  created(){ //实例被创建回调
    this._getHomeMultidata(),

    /* 根据类型请求对应商品数据 */
    this._getHomeGoods('pop'),
    this._getHomeGoods('new'),
    this._getHomeGoods('sell')
  },
  methods:{
    /* 事件监听相关 */
    tabclick(index){ //点击切换导航栏，动态设置请求商品类型
      switch(index) {
        case 0:
          this.currentindex = 'pop'
          break
        case 1:
          this.currentindex = 'new'
          break
        case 2:
          this.currentindex = 'sell'
          break
      }
      // 让吸顶模块变得一致
      this.$refs.tabcontrolone.currentindex = index
      this.$refs.tabcontroltwo.currentindex = index
    },
    contentscroll(position){ //实时监听滚动
    // 1.backtop状态
      this.isshow = -position.y > 620 //只要滚动的距离大于了该值isshow的状态就为true，向下滚动y的值为负数需要取正
    // 2.tabcontrol是否吸顶
      this.isshowtabcontrol = (-position.y >= this.tabcontroloffsettop)
    },
    loadmore(){ //scroll组件传来的上拉加载更多
      this._getHomeGoods(this.currentindex)
    },
    swiperimgload(){ //处理HomeSwiper.vue传来的图片监听事件
      this.tabcontroloffsettop = this.$refs.tabcontrolone.$el.offsetTop //得到tabcontrol的offsetTop值
    },

    /* 网络请求相关 */
    _getHomeMultidata(){ //请求轮播图 推荐数据
      getHomeMultidata().then(res =>{ 
        this.banner = res.data.banner.list 
        this.recommend = res.data.recommend.list
      })
    },
    _getHomeGoods(type){ //请求goods展示商品数据
      const page = this.goods[type].page + 1 //下次请求的是下一页的数据
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list) //将请求到的数据添加到goods中
        this.goods[type].page +=1 //请求之后下次请求的页数要加一

        this.$refs.scroll.scroll.finishPullUp() //finishPullUp事件可以消除pullingUp事件带来的加载行为，使其可以多次调用
      })
    }
  },
}
</script>

<style scoped>
#home{
  height: 100vh;
  /* position: relative; */
}
.content{
  /* margin-top: 44px; */
  /* 计算content高度方法一:calc算法，content可滚动的高度为100%的视口减去navbar和tabbar */
  /* height: calc(100% - 44px - 49px);  */
  /* 计算content高度方法二:使用绝对定位 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

  overflow: hidden;
}
.tabcontroltwo{
  position: relative;
  z-index: 10;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10; */
}
</style>
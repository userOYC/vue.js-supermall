<template>
  <div class="category">
    <!-- 标题栏 -->
    <nav-bar class="category-navbar"> <template v-slot:center>商品分类</template> </nav-bar>
      <div class="category-content">
        <!-- 侧边栏分类列表 -->
        <tab-menu :categories="categories" @selectitem="selectitem" class="content-left"></tab-menu>
        <!-- 右边展示区域 -->
        <scroll id="tab-content" ref="scroll" @scroll="contentscroll">
          <div>
            <!-- 小模块展示 -->
            <tab-content-category :subcategories="showSubcategory"></tab-content-category>
            <!-- 推荐导航栏 -->
            <tab-control :title="['流行','新款','精选']" @tabclick="tabclick"></tab-control>
            <!-- 推荐 -->
            <goods-list :goods="showCategoryDetail"></goods-list>
          </div>
        </scroll>
      </div>
      <!-- 回到顶部 -->
    <back-top @click="backtopclick" v-show="isshow"></back-top>

    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar' //标题
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/private/tabcontrol/TabControl' //推荐导航栏
import GoodsList from 'components/private/goods/GoodsList' //推荐

import TabContentCategory from './childComps/TabContentCategory' //侧边栏子模块展示
import TabMenu from './childComps/TabMenu' //侧边栏

import {mixinBackTop} from 'assets/js/mixin' //引入混入


import {getCategory,getSubcategory,getCategoryDetail} from 'network/category' //请求数据
export default {
  name:'Category',

  components:{
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    TabMenu,
    TabContentCategory
  },

  mixins:[mixinBackTop], //导入混入

  data(){
    return {
      categories:[], //分类侧边栏
      categoryData:{}, //分类侧边栏里面的数据
      currentIndex:-1, //请求数据的索引
      currentType:'pop', //请求推荐数据的类型
    }
  },

  computed: {
		showSubcategory() { //将数据传给TabContentCategory展示
      /* 1.如果currentIndex为-1 表示还没进入到改分类页面，不需要传数据过去 */
		  if (this.currentIndex === -1) return {}
      /* 2.如果currentIndex不为-1，则表示已经进入了该页面，将数据发送过去，_getSubcategories方法中更改了currentIndex*/
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() { //将数据传给goodslist展示
		  if (this.currentIndex === -1) return []
		  return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },

  methods:{
    // 网络请求相关
    _getCategory(){ //请求分类侧边栏数据
      getCategory().then(res=>{
        /* 1.获得分类列表数据 */
        this.categories = res.data.category.list;
        /* 2.初始化每个分类的子数据 */
        for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {}, //小模块展示信息
              categoryDetail: { //推荐
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
        /* 3.请求第一个分类的数据 */
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index){ //请求分类列表子列表数据
      this.currentIndex = index; //得到当前需要请求的元素索引
      const mailKey = this.categories[index].maitKey; //获取元素内标识
      getSubcategory(mailKey).then(res=>{ //传入标识，发送请求
        this.categoryData[index].subcategories = res.data //得到小模块展示数据
        this.categoryData = {...this.categoryData}
        /* 根据分类请求推荐数据 */
        this._getCategoryDetail('pop')
        this._getCategoryDetail('new')
        this._getCategoryDetail('sell')
      })
    },

    _getCategoryDetail(type) { //请求推荐数据
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
          // console.log(this.categoryData);
        })
      },

    // 事件监听相关
    selectitem(index) { //监听TabMenu侧边栏传来的事件
      this._getSubcategories(index) //一点击就请求数据
    },
    tabclick(index){//监听推荐导航栏的点击,改变请求数据的类型
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    contentscroll(position){ //混入 实时监听滚动
    // backtop状态
      this.isshow = -position.y > 500 //只要滚动的距离大于了该值isshow的状态就为true，向下滚动y的值为负数需要取正
    },
  },
 
  created(){ //实例被创建就请求分类数据
    this._getCategory()
  },
}
</script>

<style>
.category-navbar{
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
}
.category{
  height: 100vh;
}
.category-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
  overflow: hidden;
}

#tab-content {
  height: 100%;
  flex: 1;
}
</style>
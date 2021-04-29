import { createStore } from 'vuex'

export default createStore({
  state: {
    cartlist: [], //存放商品对象
    isshow: true, //管理底部工具栏切换状态
  },
  mutations: {
    changeisshow(state) { // 改变管理和支付isshow状态
      state.isshow = !state.isshow
    },
    addcount(state, product) { //对传来的商品数量加一
      product.count += 1;
    },
    addcart(state, productObject) { //添加到购物车
      productObject.checked = true /* 购物车选中状态 */
      state.cartlist.push(productObject)
    },
    removecartlist(state) { //移除选中商品
      // 判断那些商品没被选中
      let newcartlist = state.cartlist.filter((v, index) => v.checked === false)
      // 重新赋值给cartlist
      state.cartlist = newcartlist

    },
    changeChecked(state, iteminfo) { //点击修改勾选状态
      for (let item of state.cartlist) {
        if (iteminfo.iid === item.iid) {
          item.checked = !iteminfo.checked
        }
      }
    },
  },
  actions: { //异步操作或者复杂操作交给actions
    addtocart(context, productObject) { //添加商品，productObject是传来的商品对象
      return new Promise((resolve, reject) => {
        /* 查找cartlist中的商品对象是否有和新传入的商品对象的iid一样的，有则返回该cartlist中的对象 */
        let product = context.state.cartlist.find(item => item.iid === productObject.iid)
        if (product) { //如果已有该对象则条件为true，则商品对象数量加一
          context.commit('addcount', product) //交给mutations管理
          resolve('该商品数量+1'); //向外暴露结果
        } else { //如果没有该对象，则push该对象到cartlist且数量等于1
          context.commit('addcart', productObject)
          productObject.count = 1;
          reject('加入购物车成功'); //向外暴露结果

        }
      })
    },
    setlocalStorage(context) { //

    }
  },
  modules: {
  }
})

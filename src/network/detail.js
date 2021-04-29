import { request } from './request'

export function getdetail(iid) { //请求详情页数据
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() { //请求详情页推荐数据
  return request({
    url: '/recommend',
  })
}

/* 创造一个类，让子组件请求面向的是我们整理好的数据，而不是直接去筛选服务器上杂乱的数据 */
export class Goods { //保存我们需要展示的商品数据
  constructor(itemInfo, columns, services, name) { /* 创建实例的时候需要传入三个参数 */
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
    this.name = name
  }
}

//保存需要展示的店铺信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

//保存需要展示的商品参数信息
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    // this.sizes = rule.tables;
  }
}
// 首页面向该文件发送网络请求
import { request } from './request'

export function getHomeMultidata() { // 请求首页数据
  return request({ //request的返回值是promise,调用then方法拿到结果 详情看request.js文件
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) { // 请求展示商品信息 要求传入type请求类型，page请求页数
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
import { request } from './request'

export function getCategory() { //请求分类数据
  return request({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {//请求分类中侧边栏数据，需要传入一个标识
  return request({
    url: './subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) { //请求侧边栏子分类中的详情数据
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
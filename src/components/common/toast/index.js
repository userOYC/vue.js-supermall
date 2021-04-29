import Toast from './Toast'
import { createApp } from 'vue'

const mytoast = {}

mytoast.install = function (app) { /* 调用install会默认传入Vue实例 */
  /* 1.创建元素 */
  const parent = document.createElement('div')
  /* 2.将创建的元素添加到body中 */
  document.body.appendChild(parent)
  /* 3.创建组件实例并挂载元素*/
  const toast = createApp(Toast).mount(parent)
  /* 4.添加全局配置方法 */
  app.config.globalProperties.$toast = toast
}
export default mytoast



import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局vant
import Vant from 'vant'
// 引入全局弹窗
import { Toast } from 'vant';
import 'vant/lib/index.css'
/* 引入弹窗 */
// import toast from 'components/common//toast/index'
/* 引入mitt插件实现全局总线 */
import mitt from "mitt"

const app = createApp(App)

//挂载事务总线为全局属性
app.config.globalProperties.$bus = new mitt()

app
  .use(store)
  .use(router)
  // .use(toast) /* 挂载插件，默认会执行install方法 */
  .use(Vant)
  .use(Toast)
  .mount('#app')

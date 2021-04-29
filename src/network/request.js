import axios from 'axios'
// 1.封装axios请求
export function request(config) {
  //1.创建axios实例
  const instanceone = axios.create({ //axios.create这个的返回值就是一个Promise
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000 /* 超时拦截 */
  })
  // 2.axios的拦截器
  instanceone.interceptors.request.use(config => { //请求成功
    return config //拦截之后需要return出去,不然外面请求之后拿不到结果
  }, error => { //请求失败
    console.log(error);
  })
  // 2.2响应拦截：
  instanceone.interceptors.response.use(res => { //res拿到的是结果
    //拦截之后需要return出去,不然外面请求之后拿不到结果
    return res.data //取出我们请求之后需要的信息
  }), err => {
    console.log(err);
  }
  // 3.发送真正的网络请求
  return instanceone(config) //相当于return了一个Promise
}
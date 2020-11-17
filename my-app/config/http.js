/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'


// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://gengyang.top'


// http request 拦截器
axios.interceptors.request.use(
  config => {
    
    return config
  },
  err => {
    console.log('axios拦截器错误')
    return Promise.reject(err)
  },
)


export default axios

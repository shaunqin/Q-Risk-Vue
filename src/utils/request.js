import axios from 'axios'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import router from '../router/index'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.Authorization = `xytoken_${getToken('Token')}`
    }
    return config
  },
  error => {
    debugger
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // token 快过期时 response header值为xy-refresh-token={ token },替换本地token
    let newToken = response.headers['xy-refresh-token'];
    if (newToken) {
      store.dispatch('user/changeToken', newToken)
    }
    const res = response.data
    if (response.status !== 200) {
      if (response.status === 201 || response.status === 202) {
        return res
      } else {
        return Promise.reject(res)
      }
    }
    if (res.code == '401') {
      store.dispatch('user/logout').then(() => {
        location.reload();
      })

      return Promise.reject(res)
    }
    return res
  }, (error) => {
    if (error.response) {
      if (error.response.data.code == '401') {
        store.dispatch('user/logout').then(() => {
          location.reload();
        })
        return false
      }
      return Promise.reject(error)
    } else {
      // 超时
      if (error.toString().indexOf("timeout") > -1) {
        Message.error("接口请求超时！")
      }
      return Promise.reject(error)
    }
  }
)
export default service

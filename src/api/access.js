import store from '../store'
// import md5 from 'js-md5'
import CryptoJS from 'crypto-js'

const getXAccess = () => {
  let dt = new Date()
  let tm = dt.getTime()
  // console.log(tm)
  if (store.getters.timex) {
    // console.log(store.getters.timex)
    tm -= store.getters.timex
  }
  // console.log(tm)
  let appid = '100001'
  let secret = 'MTc4N2RmN2M5'
  var src = CryptoJS.enc.Utf8.parse(tm + appid + CryptoJS.MD5(tm + appid + secret + tm).toString())
  return CryptoJS.enc.Base64.stringify(src)
}

export const setAccess = config => {
  let token = store.getters.token
  if (token) {
    config.headers.Authorization = token
  }
  config.headers['XCUBE-ACCESS'] = getXAccess()
  return ''
}
export const getAccess = () => {
  let token = store.getters.token
  let headers = {}
  if (token) {
    headers['Authorization'] = token
  }
  headers['XCUBE-ACCESS'] = getXAccess()
  return headers
}

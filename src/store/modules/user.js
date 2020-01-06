import {
  getUserInfo
} from '@/api/index'

const user = {
  state: {
    info: undefined
  },

  mutations: {
    SET_USERINFO: (state, data) => {
      state.info = data
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({
      commit,
      state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          let { code, data, msg } = response
          if (code === 0) {
            commit('SET_USERINFO', data)
            resolve(data)
          } else {
            reject(msg)
          }
        }).catch(error => {
          console.log(error)
          let msg = '请求异常'
          reject(msg)
        })
      })
    }
  }
}

export default user

<template>
  <div class="loadingBox">{{msg}}<i class="el-icon-loading"></i></div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: '微信登录中'
    }
  },
  mounted () {
    let userinfo = this.$store.getters.userinfo
    // 判断当前是否有用户信息，如果有的话就直接进入 否则进行登录
    // alert('user:' + userinfo)

    if (!userinfo) {
      let wxcode = this.$route.query.code
      let state = this.$route.query.state
      let topath = this.$route.query.topath
      let token = this.$store.getters.token
      // console.log(wxcode, state, topath)
      if (wxcode) { // 登录
        this.$store.dispatch('LoginByWx', {code: wxcode, wxcode: wxcode + ':1000030', reqSource: 'wx', ajaxTag: '1'}).then(() => {
          if (topath) {
            // 如果带有跳转路径 则进行调转，带上参数state
            this.$router.push({path: topath, query: {state: state}})
          } else {
            // 默认指向main
            this.$router.push('/m/main')
          }
        }).catch(msg => {
          let emsg = '登录失败!' + ' 错误原因：' + msg + '   请从企业微信重新进入本应用！'
          this.$router.push({name: 'error', params: {emsg: emsg}})
        })
      } else if (token) { // 登录信息不全 但是有token
        this.$router.push('/m/main')
      } else { // 无code 无token 进入错误页面
        this.$router.push({name: 'error', params: {emsg: '请从企业微信重新进入本应用'}})
      }
    } else {
      this.$router.push('/m/main')
    }
  }
}
</script>

<style scoped>
.loadingBox{
  width: 100px;
  margin: auto;
  margin-top: 50%;
}
</style>

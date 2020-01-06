<template>
  <div>
    <form>
      <input style="width: 80%;height: 40px;margin: 10px;"  type="text" @keyup.enter="handleSubmit" v-model="ruleForm.account" placeholder="请输入用户名"/>
      <input style="width: 80%;height: 40px;margin: 10px;"  type="password" @keyup.enter="handleSubmit" v-model="ruleForm.checkPass" placeholder="请输入密码">
      <button style="width: 80%;height: 40px;margin: 10px;" @click="handleSubmit">登录</button>
    </form>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  name: 'Login',
  data () {
    return {
      timestamp: '',
      errorMsg: '',
      showError: false,
      fullscreenLoading: false,
      ruleForm: {
        account: '',
        checkPass: ''
      }
    }
  },
  mounted () {
    // checkTime().then(res => {
    //   this.$store.commit('SET_TIME', res.data)
    // }).catch(error => {
    //   console.log(error.msg)
    // })
  },
  methods: {
    handleReset () {
      this.$refs.ruleForm.resetFields()
    },
    handleSubmit (ev) {
      this.showError = false
      if (this.validateForm()) {
        // _this.$router.replace('/table');
        this.fullscreenLoading = true
        let pwd = CryptoJS.MD5(this.ruleForm.checkPass).toString()
        let tt = new Date().getTime()
        if (this.$store.getters.timex) {
          tt -= this.$store.getters.timex
        }
        let kk = CryptoJS.MD5(tt + '').toString()
        let key = CryptoJS.enc.Utf8.parse(kk)
        let ivindex = tt % 16
        let iv = CryptoJS.enc.Utf8.parse(kk.substr(ivindex, ivindex + 16))
        let dss = CryptoJS.AES.encrypt(pwd, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.ZeroPadding
        })
        let encodepwd = CryptoJS.enc.Base64.stringify(dss.ciphertext)
        var loginParams = { username: this.ruleForm.account, password: encodepwd, timestamp: tt }
        this.$store.dispatch('LoginByUser', loginParams).then(data => {
          // console.log(data + '--')
          this.$router.push('/m/main')
          // this.$store.dispatch('GenerateRoutes', data.user.accountId).then(() => {
          //   // this.$router.init()
          //   this.$router.addRoutes(this.$store.getters.authRouters)
          //   this.$store.commit('SET_SOURCE', 'web')
          //
          // })
        }).catch(error => {
          this.errorMsg = error.msg
          this.showError = true
          this.fullscreenLoading = false
        })
      } else {
        this.errorMsg = '用户名密码不能为空'
        this.showError = true
        this.fullscreenLoading = false
      }
    },
    validateForm () {
      if (!this.ruleForm.account || !this.ruleForm.checkPass) {
        return false
      }
      return true
    },
    handleLogin () {
      this.$router.push('/m/main')
    }
  }
}
</script>

<style>
</style>

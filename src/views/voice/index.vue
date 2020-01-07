<template>
  <div class="container">
    <transition name="fade">
      <div v-if="state===9" class="bg"></div>
      <div v-if="state===0" class="bg" :class="registState">
        <div class="progress">
          <div v-if="registState==='registed'" class="progress-text">验证：</div>
          <div v-else class="progress-text">注册：{{step}}/3</div>
          <div class="progress-pic" :class="stepClass">
            <!-- <img src="~@/assets/images/voice/step1.png" alt=""> -->
          </div>
        </div>
        <div class="tips">{{topTip}}</div>
        <div class="num">{{number}}</div>
        <div class="wave">
          <div class="wave1"></div>
          <div class="wave2"></div>
          <div class="wave3"></div>
        </div>
        <div class="btn" :class="btnclass">
          <div class="bottom-tip">
            <span>{{btnText}}</span>
          </div>
          <div class="light" :class="{active: recording}"></div>
          <div
            class="voice"
            @touchstart="handleTouchStart($event)"
            @touchend="handleTouchEnd($event)"
          ></div>
          <div class="bak-light" :class="{active: recording}">
            <div></div>
          </div>
        </div>
      </div>
      <div v-if="state===1" class="bg bg-2">
        <div class="logo"></div>
        <div class="list">
          <div class="line"></div>

          <div class="menu menu-1" @click="handleReset()">
            <i></i>
            <span>重设声音锁</span>
            <b></b>
          </div>
          <div class="line"></div>
          <div class="menu menu-2" @click="handleVerify()">
            <i></i>
            <span>尝试验证声音</span>
            <b></b>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue"
import wx from "weixin-js-sdk"
import { getSignature } from "@/api/wechart"
// import wxSDK from "@/wxSDK";
import { Toast } from "mint-ui"
import {
  // getUserRecordState,
  resetVoice,
  queryRecordTimes,
  numberRecog,
  addVoice,
  matchVoice,
  getUserInfo
} from "@/api/"
import base from "@/api/base"

Vue.component(Toast.name, Toast)
export default {
  name: "index",
  data() {
    return {
      registState: "",
      number: "2376 9864",
      btnText: "按住说话",
      startTime: "",
      recording: false,
      revertRecord: false,
      serverId: "",
      btnclass: "",
      step: 1,
      state: 9,
      sysid: "voice",
      userId: "",
      location: ""
    }
  },
  computed: {
    topTip: function() {
      if (this.step === 1) {
        return "请按住按钮，贴近话筒 匀速读出数字"
      } else if (this.step === 2) {
        return "很棒，请再来一次"
      } else if (this.step > 2) {
        return "最后，请再来一次"
      }
    },
    stepClass: function() {
      return "step-" + this.step
    }
  },
  created() {
    this.state = 0;
    this.preload()
    this.code = this.$route.query.code
    getUserInfo({
      agentId: base.agentId,
      code: this.$route.query.code
    })
      .then(res => {
        console.log(res)
        // alert(JSON.stringify(res))
        this.userId = res.UserId
        this.getUserVoiceState(res.UserId)
      })
      .catch(err => {
        // alert("uer" + err)
        this.errMsg = err
      })
  },
  mounted() {
    this.setWxConfig()
  },
  methods: {
    preload: function() {
      let imgs = [
        "static/images/voice/step1.png",
        "static/images/voice/btn_default.png",
        "static/images/voice/btn_alert.png",
        "static/images/voice/btn_success.png"
      ]
      for (let img of imgs) {
        let image = new Image()
        image.src = img
      }
    },
    handleTouchStart(e) {
      this.recording = true
      this.btnclass = ""
      this.btnText = "按住说话"
      e.preventDefault()
      wx.startRecord({
        fail: function() {
          Toast("开始录音报错,请重新录音")
        }
      })
    },
    handleTouchEnd(e) {
      // this.btnclass = "success"
      this.recording = false
      let self = this
      e.preventDefault()
      wx.stopRecord({
        success: function(res) {
          wx.uploadVoice({
            localId: res.localId,
            isShowProgressTips: 1,
            success: function(res) {
              self.serverId = res.serverId // 返回音频的服务器端ID
              self.btnText = "验证中..."
              let param = {
                sysid: self.sysid,
                ID_Upload: res.serverId,
                User_info: self.userId
              }
              numberRecog(param)
                .then(res => {
                  if (res.status === "0") {
                    self.handleRecordResult(res.results)
                  }
                  // alert("res:" + JSON.stringify(res))
                })
                .catch(err => {
                  alert("err:" + JSON.stringify(err))
                })
            }
          })
        },
        fail: function() {
          Toast("开始录音报错,请重新录音")
        }
      })
    },
    setWxConfig() {
      let url = location.href.split("#")[0]
      let conditon = {
        agentId: base.agentId,
        url: encodeURI(url)
      }
      getSignature(conditon)
        .then(ref => {
          // alert("sign" + JSON.stringify(ref))
          wx.config({
            debug: false,
            appId: ref.appId, // 必填，企业微信的cropID
            timestamp: ref.timestamp, // 必填，生成签名的时间戳
            nonceStr: ref.nonceStr, // 必填，生成签名的随机串
            signature: ref.signature, // 必填，签名，见附录1
            jsApiList: [
              "checkJsApi",
              "startRecord",
              "stopRecord",
              "uploadVoice",
              "downloadVoice"
            ]
          })

          wx.ready(function() {
            wx.checkJsApi({
              jsApiList: [
                "startRecord",
                "stopRecord",
                "uploadVoice",
                "downloadVoice"
              ],
              success: function(res) {
                // alert("jsApiList:" + JSON.stringify(res))
              }
            })
          })

          wx.error(function(res) {
            // alert("errMsg:" + JSON.stringify(res.errMsg))
          })
        })
        .catch(err => {
          console.log("err" + JSON.stringify(err))
        })
    },
    getUserVoiceState(userId) {
      queryRecordTimes(userId)
        .then(res => {
          // alert(JSON.stringify(res))
          let times = res.data
          if (times > 2) {
            // 已注册
            this.state = 1
            this.registState = "registed"
          } else {
            this.state = 0
            this.number = this.randomNumbers()
            this.step = times + 1
          }
        })
        .catch(err => {
          alert(JSON.stringify(err))
        })
      // 获取用户状态
      // let params = {
      //   noid: "",
      //   sysid: this.sysid,
      //   User_info: userId
      // }
      // getUserRecordState(params)
      //   .then(res => {
      //     // alert(JSON.stringify(res))
      //     if (res.status === "0") {
      //       if (res.results === false) {
      //         // 未注册
      //         this.state = 0
      //         this.number = this.randomNumbers()
      //       } else {
      //         // 已注册
      //         this.state = 1
      //         this.registState = "registed"
      //       }
      //     } else {
      //       Toast(res.msg)
      //     }
      //   })
      //   .catch(err => {
      //     alert(JSON.stringify(err))
      //   })
    },
    // 录入结果处理
    handleRecordResult(arr) {
      let self = this
      // 临时
      // arr[0] = self.number.replace(/\s+/g, "")
      // alert(arr[0] + "," + self.number.replace(/\s+/g, ""))
      // if (self.number.replace(/\s+/g, "") === arr[0]) {
      if (self.calcRight(self.number.replace(/\s+/g, ""), arr[0], 2)) {
        self.location = arr[1]
        if (self.registState === "registed") {
          // 验证
          let params = {
            noid: "",
            sysid: self.sysid,
            audio: arr[1],
            User_info: self.userId
          }
          matchVoice(params)
            .then(res => {
              // alert("matchres:" + JSON.stringify(res))
              if (
                res.results[0].similarity > 0.7 &&
                res.results[0].dataid === self.userId
              ) {
                self.btnclass = "success"
                self.btnText = "验证成功，" + self.userId
              } else {
                self.btnclass = "fail"
                self.btnText = "验证失败，您的声音与注册时不一致"
              }
              let timer = setTimeout(() => {
                self.state = 1
                self.btnclass = ""
                self.btnText = "按住说话"
                clearTimeout(timer)
              }, 2000)
            })
            .catch(err => {
              alert("err:" + JSON.stringify(err))
            })
        } else {
          self.btnclass = "success"
          self.btnText = "验证成功"
          let timer = setTimeout(function() {
            self.btnclass = ""
            self.btnText = "按住说话"
            clearTimeout(timer)
          }, 1000)
          // 声纹入库
          let params = {
            noid: "",
            sysid: self.sysid,
            audio: arr[1],
            User_info: self.userId
          }
          addVoice(params)
            .then(res => {
              // alert("add" + JSON.stringify(res))
            })
            .catch(err => {
              alert(JSON.stringify(err))
            })
          if (self.step === 3) {
            self.state = 1
            self.step = 0
          }
          self.step++
          self.number = self.randomNumbers()
        }
      } else {
        // 输入的数字不正确
        self.btnclass = "fail"
        self.btnText = "您的语音与数字不一致 请按住重新录制!"
      }
    },
    // 重设声音锁
    handleReset() {
      let self = this
      resetVoice(this.userId)
        .then(res => {
          // alert(JSON.stringify(res))
          if (res.status === 0 && res.success) {
            self.state = 0
            self.step = 1
            self.registState = ""
          }
        })
        .catch(err => {
          alert(JSON.stringify("reseterr:" + err))
        })
    },
    // 验证声音
    handleVerify() {
      this.state = 0
      self.step = 1
      this.registState = "registed"
      this.number = this.randomNumbers()
    },
    randomNumbers() {
      const NUM = 0.6;
      let str = "";
      let arr1 = [0, 1, 2, 3, 4, 6, 7, 8, 9];
      for (let i = 0; i < 8; i++) {
        let n = arr1[Math.floor(Math.random() * 9)];
        if (n === 8) {
          if (Math.random() < NUM) {
            let arr = [0, 1, 2, 3, 4, 6, 7, 9];
            n = arr[Math.floor(Math.random() * 8)]
          }
        }
        if (i === 4) {
          str += " ";
        }
        str += n;
      }
      return str;
      // let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      // let str = ""
      // for (let i = 0; i < 8; i++) {
      //   let randomNum = Math.floor(Math.random() * arr.length)
      //   let n = arr[randomNum]
      //   arr.splice(randomNum, 1)
      //   if (i === 4) {
      //     str += " "
      //   }
      //   str += n
      // }
      // return str
    },
    calcRight(num1, num2, n) {
      const s = num1 + ""
      const t = num2 + ""
      const lens = s.length
      const lent = t.length
      let arr = []
      for (let i = 0; i < lens; i++) {
        arr[i] = []
        for (let j = 0; j < lent; j++) {
          arr[i][j] = 0
        }
      }
      for (let i = 0; i < lens; i++) {
        arr[i][0] = i
      }
      for (let i = 0; i < lent; i++) {
        arr[0][i] = i
      }
      for (let j = 1; j < lent; j++) {
        for (let i = 1; i < lens; i++) {
          if (s[i - 1] === t[j - 1]) {
            arr[i][j] = arr[i - 1][j - 1]
          } else {
            arr[i][j] =
              this.min(arr[i - 1][j], arr[i][j - 1], arr[i - 1][j - 1]) + 1
          }
        }
      }
      return arr[lens - 1][lent - 1] <= n
    },
    min(a, b, c) {
      let min = a
      if (b < min) {
        min = b
      }
      if (c < min) {
        min = c
      }
      return min
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/sass/main.scss";
</style>

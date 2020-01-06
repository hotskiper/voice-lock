<template>
  <div>
    <button @click="getInfo">加载信息</button>
    <button @click="sendCard">发送卡片</button>
    <button @click="getUserInDate">获取人员入职信息</button>
    <button @click="selectUser">人员选择</button>
    <json-viewer :value="jsonData"  :expand-depth=5 copyable boxed></json-viewer>
  </div>
</template>

<script>
// import {getThanksCardInfo, sendCard, getUserInDate} from '../../api/auth/'
// import {getSignature} from '../../api/wechart'
// import base from '../../api/base'
// import wx from 'weixin-js-sdk';

export default {
  name: 'api',
  data () {
    return {
      jsonData: ''
    }
  },
  mounted () {
  //   let url = location.href.split("#")[0]
  //   // 微信SDK 注册
  //   getSignature({agentId: base.agentId, url: encodeURI(url)}).then(res => {
  //     console.log(res)
  //     wx.config({
  //       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //       appId: 'wl50ea71a776', // 必填，企业微信的cropID
  //       timestamp: res.data.time, // 必填，生成签名的时间戳
  //       nonceStr: 'fiberhome', // 必填，生成签名的随机串
  //       signature: res.data.sign, // 必填，签名，见附录1
  //       jsApiList: ['selectEnterpriseContact'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  //     })
  //   })
  // },
  // methods: {
  //   getInfo () {
  //     // 获取可发送贺卡及收到的贺卡列表
  //     getThanksCardInfo().then(res => {
  //       this.jsonData = res
  //       console.log(res)
  //     }).catch(e => {
  //       this.jsonData = e
  //       console.log(e.msg)
  //       console.log(e)
  //     })
  //   },
  //   sendCard () {
  //     // 发送贺卡
  //     sendCard({ type: '1', // 类型
  //       receiveId: '接收人ID', // 接收人
  //       content: '内容', // 卡片内容
  //       isAnonymous: '0' // 是否匿名： 0 否  1是
  //     }).then(res => {
  //       this.jsonData = res
  //       console.log(res)
  //     }).catch(e => {
  //       this.jsonData = e
  //       console.log(e.msg)
  //       console.log(e)
  //     })
  //   },
  //   selectUser () {
  //     // 在企业微信中打开选人接口（需要先将微信sdk注册成功）
  //     wx.invoke("selectEnterpriseContact", {
  //       "fromDepartmentId": 0, // 必填，-1表示打开的通讯录从自己所在部门开始展示, 0表示从最上层开始
  //       "mode": "single", // 必填，选择模式，single表示单选，multi表示多选
  //       "type": ["user"], // 必填，选择限制类型，指定department、user中的一个或者多个
  //       // "selectedDepartmentIds": ["2", "3"], // 非必填，已选部门ID列表。用于多次选人时可重入
  //       // "selectedUserIds": ["lisi", "lisi2"], // 非必填，已选用户ID列表。用于多次选人时可重入
  //       "includeExternalContact": 1 // 非必填，是否包含外部联系人。
  //     }, function(res) {
  //       if (res.err_msg === "selectEnterpriseContact:ok") {
  //         if (typeof res.result === 'string') {
  //           res.result = JSON.parse(res.result) // 由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
  //         }
  //         console.log(res)
  //       }
  //     })
  //   },
  //   getUserInDate () {
  //     // 获取当前登录人的入职信息，返回入职日期及入职总天数。没有信息的返回 “” 0
  //     getUserInDate().then(res => {
  //       this.jsonData = res
  //       console.log(res)
  //     }).catch(e => {
  //       this.jsonData = e
  //       console.log(e.msg)
  //       console.log(e)
  //     })
  //   }
  }
}
</script>

<style scoped>

</style>

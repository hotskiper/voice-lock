<template>
  <div class="container">
    <transition name="fade">
      <div class="bg">
        <div class="logo"></div>
        <div class="list">
          <div class="line"></div>
          <div class="menu menu-1">
            <i></i>
            <span>重设声音锁</span>
            <b></b>
          </div>
          <div class="line"></div>
          <div class="menu menu-2">
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
// import wx from "weixin-js-sdk"
// import { getSignature } from "@/api/wechart"
// import wxSDK from "@/wxSDK";
import { Toast, Button, Field, Cell, Picker } from "mint-ui"
// import { voiceTest, testApi } from "@/api/"

Vue.component(Cell.name, Cell)
Vue.component(Picker.name, Picker)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
Vue.component(Toast.name, Toast)
export default {
  name: "index",
  data() {
    return {
      userinfo: this.$store.getters.userinfo || {}
    }
  },
  created() {},
  mounted() {
    
  },
  methods: {}
}
</script>

<style lang="scss">
@import "~@/assets/sass/list.scss";

</style>

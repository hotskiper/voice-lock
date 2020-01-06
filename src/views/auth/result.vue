<template>
  <div class="container">
    <div class="result-wrap">
      <div class="result-content">
        <div v-if="resultState === 'fail'" class="result-fail">
          <div class="title-wrap">
            <span class="mint-toast-icon mintui mintui-field-error"></span>
            <span>
              <p class="title error">授权失败</p>
              <p>您的机器码规则错误，请重新申请</p>
            </span>
          </div>
          <mt-button type="primary" @click="rescanBtn">重新扫描</mt-button>
        </div>
        <div v-if="resultState === 'success'" class="result-success">
          <div class="title-wrap">
            <span class="mint-toast-icon mintui mintui-field-success"></span>
            <span>
              <p class="title success">授权成功</p>
            </span>
          </div>
          <div class="result-info">
            <span class="title">授权码：</span>
            <span>{{result.licCode}}</span>
          </div>
          <div class="result-info">
            <span class="title">截止日期：</span>
            <span>{{result.expireTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "result",
  data() {
    return {
      resultState: this.$route.query.resultState || "fail",
      result: JSON.parse(unescape(this.$route.query.result)) || {}
    };
  },
  mounted() {},
  methods: {
    rescanBtn() {
      this.$router.replace({ path: "/m/main" });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/main.scss";
</style>

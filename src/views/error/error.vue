<template>
  <div style="display: table;height: 100%;">
  <div class="error">
    <img src="../../assets/images/ycym_wuwangluo.png" style="width: 100%;">
    {{msg}}  {{this.$route.params.emsg}}</div>
  </div>
</template>

<script>
export default {
  name: 'error',
  data () {
    return {
      msg: '请检查网络并重试！'
    }
  }
}
</script>

<style scoped>
.error{
  /*margin-top:50%;*/
  font-size: 14px;
  color:#a3a3a3;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}
</style>

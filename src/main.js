// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

import Vue from "vue";
import App from "./App";
import router from "./router";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条 样式
import axios from "axios";
import Vuex from "vuex";
import store from "./store";
import qs from "qs";
import 'lib-flexible/flexible';
import "./assets/css/app.css";
import "mint-ui/lib/style.css";

import JsonViewer from 'vue-json-viewer';

Vue.prototype.$qs = qs;
Vue.prototype.$ajax = axios;
Vue.config.productionTip = false;
Vue.use(JsonViewer)
Vue.use(Vuex);
NProgress.configure({ showSpinner: false });

// 每次路由请求前判断是否存在用户信息，如果没有则进行登录
// const whiteList = ['/login','/m/login','/error','/m/error','/m/help']
const whiteList = [
  "/login",
  "/m/login",
  "/error",
  "/m/error",
  "/m/help",
  "/m/main",
];

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if (whiteList.indexOf(to.path) !== -1) {
    // 在白名单，直接进入
    next();
  } else {
    if (store.getters.userinfo) {
      // 存在用户信息，直接进入
      next();
    } else {
      store
        .dispatch("GetUserInfo")
        .then(res => {
          next();
        })
        .catch(() => {
          //使用token获取用户信息失败
          let emsg = "用户信息获取失败";
          next({ name: "error", params: { emsg: emsg } });
        });
    }
  }
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

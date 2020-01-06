import Vue from "vue";
import Router from "vue-router";
const _import = require("./_import_" + process.env.NODE_ENV);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/m/login",
      name: "mlogin",
      component: _import("login/login3")
    },
    {
      path: "/m/error",
      name: "error",
      component: _import("error/error")
    },
    {
      path: "/m/api",
      name: "api",
      component: _import("auth/api")
    },
    {
      path: "/m/main",
      name: "main",
      component: _import("voice/index"),
      children: []
    },
    {
      path: "/m/result",
      name: "result",
      component: _import("auth/result"),
      children: []
    }
  ]
});

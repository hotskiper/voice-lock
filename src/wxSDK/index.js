import wx from "weixin-js-sdk";
import { getSignature } from "@/api/wechart";
import base from "@/api/base";

let wxSdk = {
  init(resolve, reject) {
    this.setWxConfig(resolve, reject);
  },

  setWxConfig(resolve, reject) {
    let that = this;
    let url = location.href.split("#")[0];
    let conditon = {
      agentId: base.agentId,
      url: encodeURI(url)
    };

    getSignature(conditon).then(ref => {
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
      });

      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: [
            "startRecord",
            "stopRecord",
            "uploadVoice",
            "downloadVoice"
          ],
          success: function(res) {
            // alert('jsApiList:' + JSON.stringify(res))
          }
        });

        wx.scanQRCode({
          desc: "scanQRCode desc",
          needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          complete: function(res) {
            that.setResult(res, resolve, reject);
          },
          error: function(res) {
            alert(JSON.stringify(res));
            if (res.errMsg.indexOf("function_not_exist") > 0) {
              alert("星空下版本过低请升级");
            }
          }
        });
      });

      wx.error(function(res) {
        alert("errMsg:" + JSON.stringify(res.errMsg));
      });
    });
  },

  setResult(res, resolve, reject) {
    resolve(res);
  },

  getResult() {
    let that = this;
    return new Promise(function(resolve, reject) {
      that.init(resolve, reject);
    });
  }
};

export default wxSdk;

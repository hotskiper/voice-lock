<template>
  <div class="container">
    <transition name="fade">
      <div v-show="wrap">
        <div class="operation-content">
          <mt-field label="申请人姓名" readonly disableClear v-model="userinfo.name"></mt-field>
          <mt-field label="申请人工号" readonly disableClear v-model="userinfo.userid"></mt-field>
          <mt-field label="申请人电话" readonly disableClear v-model="userinfo.mobile"></mt-field>
          <mt-field label="申请人部门" readonly disableClear v-model="userinfo.department"></mt-field>
          <mt-field
            label="项目名称"
            :attr="{ maxlength: 32 }"
            placeholder="请输入项目名称"
            v-model="projectName"
          ></mt-field>
          <mt-field
            label="项目负责人"
            :attr="{ maxlength: 16 }"
            placeholder="请输入项目负责人"
            v-model="projectManager"
          ></mt-field>
          <mt-field
            label="服务警种"
            :attr="{ maxlength: 32 }"
            placeholder="请输入服务警种"
            v-model="servicePolice"
          ></mt-field>
          <mt-cell class="mint-field" title="服务地区">
            <input
              class="mint-field-core"
              v-model="serviceArea"
              readonly
              placeholder="请选择服务地区"
              @click="chooseServiceArea"
            />
          </mt-cell>
          <mt-field
            label="申请用途"
            placeholder="请输入申请用途"
            type="textarea"
            rows="4"
            :attr="{ maxlength: 50 }"
            v-model="application"
          ></mt-field>
          <mt-button
            class="operation-btn"
            type="primary"
            :disabled="submitState"
            size="large"
            @click="submitApplication"
          >提交申请</mt-button>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-show="!wrap">
        <div class="result-wrap">
          <div class="result-content">
            <div class="result-fail">
              <div class="title-wrap">
                <span>
                  <p class="title text-center">授权操作</p>
                  <p>点击按钮，打开星空下扫描功能</p>
                </span>
              </div>
              <mt-button type="primary" @click="getResult">扫描二维码</mt-button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <mt-popup v-model="serviceAreaPopup" class="service-area-popup" position="bottom">
      <div class="service-area-btn">
        <mt-button size="small" @click="serviceAreaPopup = false">取消</mt-button>
        <mt-button size="small" type="primary" @click="setServiceArea">确定</mt-button>
      </div>
      <mt-picker :slots="serviceAreaObj" @change="onValuesChange" ref="serviceAreaPicker"></mt-picker>
    </mt-popup>

    <transition name="fade">
      <div v-show="loading" class="loading-wrap">
        <div class="loading animation">
          <div class="shape shape1"></div>
          <div class="shape shape2"></div>
          <div class="shape shape3"></div>
          <div class="shape shape4"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import wxSDK from "@/wxSDK";
import { getServiceArea, getServiceChildArea } from "@/utils/serviceArea";
import { Toast, Button, Field, Cell, Popup, Picker, Indicator } from "mint-ui";
import { getParams, getCode } from "@/api/";

Vue.component(Cell.name, Cell);
Vue.component(Picker.name, Picker);
Vue.component(Button.name, Button);
Vue.component(Field.name, Field);
Vue.component(Popup.name, Popup);
export default {
  name: "index",
  data() {
    return {
      userinfo: this.$store.getters.userinfo || {},
      wrap: false,
      projectName: "",
      projectManager: "",
      servicePolice: "",
      serviceArea: "",
      application: "",
      machineSN: "",
      appID: "",
      version: "",
      serviceAreaPopup: false,
      submitState: false,
      loading: false,
      serviceAreaObj: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "left"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.getResult();
  },
  methods: {
    getResult() {
      wxSDK.getResult().then(res => {
        if (res.errMsg === "scanQRCode:ok") {
          this.getParams(res.resultStr);
        } else {
          this.handleFailPage();
        }
      });
    },

    getParams(code) {
      let condition = {
        tdCode: code
      };

      getParams(condition).then(res => {
        let { code, data } = res;
        if (code === 0) {
          let { machineSN, appId, version } = data.tdCode || {};
          this.machineSN = machineSN;
          this.appId = appId;
          this.version = version;
          this.wrap = true;
        } else {
          this.handleFailPage();
        }
      });
    },

    getCode() {
      if (!this.projectName) {
        Toast("项目名称不能为空");
        return false;
      }
      if (!this.projectManager) {
        Toast("项目负责人不能为空");
        return false;
      }
      if (!this.servicePolice) {
        Toast("服务警种不能为空");
        return false;
      }
      if (!this.serviceArea) {
        Toast("服务地区不能为空");
        return false;
      }
      if (!this.application) {
        Toast("申请用途不能为空");
        return false;
      }

      let condition = {
        machineSN: this.machineSN,
        appId: this.appId,
        version: this.version,
        applicant: this.userinfo.name,
        jobNum: this.userinfo.userid,
        phone: this.userinfo.mobile,
        dep: this.userinfo.department,
        appName: this.projectName,
        appManager: this.projectManager,
        police: this.servicePolice,
        cityCode: this.serviceArea,
        usage: this.application
      };

      Indicator.open({
        text: "提交数据...",
        spinnerType: "fading-circle"
      });

      this.submitState = true;

      getCode(condition).then(res => {
        this.submitState = false;
        Indicator.close();
        let { code, data } = res;
        if (code === 0) {
          this.$router.replace({
            path: "/m/result",
            query: {
              resultState: "success",
              result: escape(JSON.stringify(data))
            }
          });
        } else {
          this.handleFailPage();
        }
      });
    },

    handleFailPage() {
      this.$router.replace({
        path: "/m/result",
        query: {
          resultState: "fail",
          result: escape(JSON.stringify(""))
        }
      });
    },

    chooseServiceArea() {
      this.serviceAreaObj[0].values = getServiceArea();
      this.serviceAreaPopup = true;
    },

    onValuesChange(picker, values) {
      if (values[0] && values[0] !== undefined) {
        picker.setSlotValues(1, getServiceChildArea(values[0]));
      }
    },

    setServiceArea() {
      let picker = this.$refs.serviceAreaPicker;
      let values = picker.getValues();
      let province = values[0];
      let city = values[1] || "";
      this.serviceArea = province === city ? city : province + city;
      this.serviceAreaPopup = false;
    },

    submitApplication() {
      this.getCode();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/main.scss";
</style>

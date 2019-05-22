// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/base.css'  //导入重置样式
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axiosIns from './common/utils/Axios'  //导入
import fastclick from 'fastclick'
import './icons'  //导入svg

// xhq 2019/5/17 这个是解决 ios 返回不刷新的问题
var browserRule = /^.*((iPhone)|(iPad)|(Safari))+.*$/;
if (browserRule.test(navigator.userAgent)) {
  window.onpageshow = function(event) {
    console.log('onPageShow is run4');
    if (event.persisted) {
      console.log('onPageShow is run5');
      window.location.reload()
    }
  };
}

Vue.config.productionTip = false
Vue.use(MintUI);

fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

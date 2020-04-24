/*
 * @Author: your name
 * @Date: 2019-12-13 14:44:37
 * @LastEditTime: 2020-04-22 13:57:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sell\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './common/stylus/iconfont/iconfont.css'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI);

Vue.prototype.$axios = axios
axios.defaults.withCredentials = true

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

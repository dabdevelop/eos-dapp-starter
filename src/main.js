/* jshint esversion: 6 */ 

import Vue from 'vue';
import App from './App.vue';
import './plugins/element.js';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    locale: localStorage.getItem('lang') != undefined ? localStorage.getItem('lang') : 'zh-CN'
  }
});
const i18n = new VueI18n({
  locale:localStorage.getItem('lang')!=undefined?localStorage.getItem('lang'):'zh-CN',
  messages: {
    'zh-CN': require('./assets/js/lang/zh'),   // 中文语言包
    'en-US': require('./assets/js/lang/en')    // 英文语言包
  }
});

new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App),
}).$mount('#app');

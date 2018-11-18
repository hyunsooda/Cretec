
import Vue from 'vue'
import Vuex from 'vuex';
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import axios from 'axios';
import store from './components/Store';
import Util from './Util';

Vue.prototype.$axios = axios;
Vue.use(Vuetify);
Vue.config.productionTip = false;


/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default vm;
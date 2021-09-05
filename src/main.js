import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式表
import './assets/css/global.css'

// 导入element-UI
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 使用axios
import axios from 'axios'
axios.defaults.baseURL="http://timemeetyou.com:8889/api/private/v1/"
Vue.prototype.$http = axios

Vue.prototype.$message =Message
Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

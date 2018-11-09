import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import elementUi from 'element-ui'
import http from './utils/http.js'
import common from './utils/common.js'
import userInfo from './utils/userinfo.js'
import bus from './utils/eventBus.js'
import nullTips from './components/nullTips.vue'
import './utils/rem.js'
import './assets/themes/element-variables.scss'
import './assets/font/iconfont.css'
import './assets/fonts/iconfont.css'
import './assets/main.css'
import store from './store'
Vue.use(VueLazyload, {
  error:'/ABP-068.jpg',
  throttleWait: 100,
  loading: '/ABP-068.jpg',
  listenEvents: ['scroll', 'touchmove']
})
Vue.prototype.$bus = bus
Vue.config.productionTip = false
Vue.use(elementUi)
Vue.use(http)
Vue.use(common)
Vue.use(userInfo)
Vue.component('null-tips', nullTips)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

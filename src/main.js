import Vue from 'vue'
import App from './App'
import VueSocketio from 'vue-socket.io'
import VueNativeNotification from 'vue-native-notification'
import router from './router'
Vue.config.productionTip = false
Vue.use(VueSocketio, 'http://localhost:3001')
Vue.use(VueNativeNotification, {
  requestOnNotify: true
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

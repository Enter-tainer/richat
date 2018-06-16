import Vue from 'vue'
import Router from 'vue-router'
import MessageArea from '@/components/MessageArea'
import notFound from '@/components/404'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'MessageArea',
    component: MessageArea
  }, {
    path: '/*',
    name: 'notFound',
    component: notFound
  }]
})

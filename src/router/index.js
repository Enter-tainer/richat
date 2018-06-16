import Vue from 'vue'
import Router from 'vue-router'
import MessageArea from '@/components/MessageArea'

Vue.use(Router)

export default new Router({
  routes: [ {
    path: '/',
    name: 'MessageArea',
    component: MessageArea
  }]
})

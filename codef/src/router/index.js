import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '답안검색',
      component: HelloWorld
    }, 
    {
      path: '/user',
      name: '전적검색',
      component: User
    }
  ]
})

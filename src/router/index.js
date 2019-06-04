import Vue from 'vue'
import Router from 'vue-router'
import ArticlesPage from '@/pages/ArticlesPage'
import DetailPage from '@/pages/DetailPage'
import HomePage from '@/pages/HomePage'
import PublishPage from '@/pages/PublishPage'
import UserPage from '@/pages/UserPage'
import TestForm from '@/pages/TestForm'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/articles',
      name: 'ArticlesPage',
      component: ArticlesPage
    },
    {
      path: '/detail',
      name: 'DetailPage',
      component: DetailPage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/publish',
      name: 'PublishPage',
      component: PublishPage
    },
    {
      path: '/user',
      name: 'UserPage',
      component: UserPage
    },
    {
      path:'/test',
      name:'TestForm',
      component:TestForm
    }
  ]
})

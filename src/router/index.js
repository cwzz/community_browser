import Vue from 'vue'
import Router from 'vue-router'
import ArticlesPage from '@/pages/ArticlesPage'
import DetailPage from '@/pages/DetailPage'
import HomePage from '@/pages/HomePage'
import PublishPage from '@/pages/PublishPage'
import UserPage from '@/pages/UserPage'
import UserPublishPage from '@/pages/UserPublishPage'
import UserCollectPage from '@/pages/UserCollectPage'
import UserFollowPage from '@/pages/UserFollowPage'
import UserFansPage from '@/pages/UserFansPage'
import UserInfoPage from '@/pages/UserInfoPage'
import UserMessagePage from "@/pages/UserMessagePage";

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
      path: '/user/publish',
      name: 'UserPublishPage',
      component:UserPublishPage
    },
    {
      path:'/user/collect',
      name:'UserCollectPage',
      component:UserCollectPage
    },
    {
      path:'/user/follow',
      name:'UserFollowPage',
      component:UserFollowPage
    },
    {
      path:'/user/fans',
      name:'UserFansPage',
      component:UserFansPage
    },
    {
      path: '/user/info',
      name:'UserInfoPage',
      component:UserInfoPage
    },
    {
      path:'/user/message',
      name:'UserMessagePage',
      component:UserMessagePage
    }
  ]
})

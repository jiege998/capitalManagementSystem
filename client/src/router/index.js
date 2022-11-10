import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login'
const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/home',
    redirect:'home/index'
  },
  {
    path: '/login',
    name: 'login',
    meta:{
      title:'登录'
    },
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    meta:{
      title:'首页'
    },
    component: () => import( '../views/home'),
    children:[{
      path:'index',
      name:'index',
      meta:{
        title:'首页',
      },
      component: () => import( '../views/index'),
    },
    {
      path:'infolist',
      name:'infolist',
      meta:{
        title:'简介',
      },
      component: () => import( '../views/info'),
    },
    {
      path:'fundlist',
      name:'fundlist',
      meta:{
        title:'资金流水',
      },
      component: () => import( '../views/fund'),
    }]
  },
  {
    path: '/register',
    name: 'register',
    meta:{
      title:'注册'
    },
    component: () => import( '../views/register')
  },
  {
    path: '/:pathMath(.*)',
    name: 'notfound',
    meta:{
      title:'404'
    },
    component: () => import( '../views/404')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

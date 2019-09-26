import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/index.vue'
import List from './views/List/index.vue'
import Cart from './views/Cart/index.vue'
import User from './views/User/index.vue'
import Index from './views/Index/index.vue'
import Login from './views/Login/index.vue'
import Detail from './views/Detail/index.vue'
import Register from './views/Register/index.vue'
Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:{name:'home'}
    },
    {
      path:'/home',
      name:'home',
      component:Home,
      redirect:{name:'index'},
      children:[
        {
          path:'/index',
          name:'index',
          component:Index,
          meta:{
            title:'首页-锤子官网'
          }
        },
        {
          path: '/list',
          name:'list',
          component:List,
          meta:{
            token:true,
            title:'分类-锤子官网'
          }
        },
        {
          path:'/cart',
          name:'cart',
          component:Cart,
          meta:{
            token:true,
            title:'购物车-锤子官网'
          }
        },
        {
          path:'/user',
          name:'user',
          component:User,
          meta:{
            token:true,
            title:'个人中心-锤子官网'
          }
        }
      ]
    },
    {
      path:'/detail/:id',
      name:'detail',
      component:Detail,
      meta:{
        title:'详情页面-锤子官网'
      }
    },
    {
      path:'/login',
      name:'login',
      component:Login,
      meta:{
        title:'登录页面-锤子官网'
      }
    },
    {
      path:'/register',
      name:'register',
      component:Register,
      meta:{
        title:'注册页面-锤子官网'
      }
    }
  ]
})
//权限路由
router.beforeEach((to, from, next) => { 
  if(to.meta.title){
    document.title = to.meta.title
  }
  if (to.matched.some(record => record.meta.token)) {
    if (!sessionStorage.getItem('user')) {  
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
     
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
export default router;
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
import AddMessage from './components/AddMessage.vue';
import store from './store/index';

const routes = [
    {
        name:'Dashboard',
        path:'/',
        component:Dashboard
    },
    {
        name:'Login',
        path:'/login',
        component:Login,
        meta:{
            requiresGuest:true,
        }
    },
    {
        name:'Register',
        path:'/register',
        component:Register,
        meta:{
            requiresGuest:true,
        }
    },
    {
        name:'Logout',
        path:'/logout',
        component:Logout
    },
    {
        name:'AddMessage',
        path:'/add_message',
        component:AddMessage,
        meta:{
            requiresAuth:true,
        }
    },
    
]

const router = createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to,from,next) =>{
    if(to.matched.some(record => record.meta.requiresAuth)){
      if(!store.getters.isLoggedIn){
        next({
          path:'/login',
        })
      }else{
        next()
      }
    }else if(to.matched.some(record => record.meta.requiresGuest)){
      if(store.getters.isLoggedIn){
        next({
          path:'/add_message',
        })
      }else{
        next()
      }
    }
    else{
      next()
    }
})

export default router


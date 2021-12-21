import { createApp } from 'vue'
import Dashboard from './components/Dashboard.vue'
import Navbar from './components/Navbar.vue'
import Bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.css'
import router from './router'
import store from './store/index';

const app = createApp({});
app.component('Dashboard',Dashboard)
app.component('navbar',Navbar)
    .use(Bootstrap)
    .use(router)
    .use(store)
    .mount('#app')

require('./bootstrap');

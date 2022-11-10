import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import VueParticles from 'vue-particles'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Axios from './assets/http/axios.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App); 
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title ? '资金后台管理系统 | ' + to.meta.title : '资金后台管理系统'
    if (sessionStorage.getItem('Authorization')) {
            next()  
    } else {
        if (to.path === '/login' || to.path === '/register') {
            next()
        } else {
            next('/login')
        }
    }
})
app.config.globalProperties.$axios=Axios;
app.use(store).use(router).use(ElementPlus).use(VueParticles).use(VueAxios, axios).mount('#app')

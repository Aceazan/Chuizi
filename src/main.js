import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font/css/font-awesome.min.css';
import 'mint-ui/lib/style.css';
import MintUi from 'mint-ui'
import './api/request'
import 'swiper/dist/css/swiper.css';
import './assets/fontone/iconfont.css'
Vue.config.productionTip = false

Vue.use(MintUi);
window.router=router
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

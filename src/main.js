import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'assets/font_music/iconfont.css'
import less from 'less'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/index.css'
Vue.use(ElementUI);
import { Message,Carousel } from 'element-ui';
Vue.component(Message.name, Message);
Vue.component(Carousel.name, Carousel);
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
new Vue({
  data() {
    return {
      wwidth:762,
      p:{},
      listyle:[],
    }
  },
  store,
  router,
  render: h => h(App)
}).$mount('#app')

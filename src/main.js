import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) { //判断token是否存在
      config.headers.token = sessionStorage.getItem('token');  //将token设置成请求头
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;

router.beforeEach((to,from,next)=>{
  let expireTime = sessionStorage.getItem('expireTime');
  if(to.path !== '/login'){
      next();
  }else{
    next();
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')


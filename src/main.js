import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });

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


import Vue from 'vue';
import Router from 'vue-router';
import goods from '../components/goods/goods';
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller';
import Vueresource from 'vue-resource';

Vue.use(Router);
Vue.use(Vueresource);

export default new Router({
  routes: [
    {
      path: '/',
      // 直接重定向
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ],
  linkActiveClass: 'active'
});

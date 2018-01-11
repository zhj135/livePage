import Vue from 'vue';
import Router from 'vue-router';
import LivePage from '@/components/LivePage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LivePage',
      component: LivePage,
    },
  ],
});

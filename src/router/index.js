import Vue from 'vue';
import VueRouter from 'vue-router';
import goTo from 'vuetify/lib/services/goto';

import Home from '../views/Home.vue';
import New from '../views/NewRegistration.vue';
import Inventory from '../views/InventoryList.vue';
import About from '../views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.afterEach((to, from) => {
  goTo(0, { duration: 0 });
});

export default router;

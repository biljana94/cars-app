import VueRouter from 'vue-router';
import Vue from 'vue';

import AppCars from './components/AppCars.vue';

Vue.use(VueRouter);


const routes = [
    {path: '/', redirect: '/cars'},
    {path: '/cars', component: AppCars, name: 'cars'},
];

export const router = new VueRouter({
    mode: 'history', //da nam skloni hashtag(#) sa rute
    routes
});

// export default router;

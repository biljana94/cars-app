import VueRouter from 'vue-router';
import Vue from 'vue';

import AppCars from './components/AppCars.vue';
import AddCar from './components/AddCar.vue';


Vue.use(VueRouter);


const routes = [
    {path: '/', redirect: '/cars'},
    {path: '/cars', component: AppCars, name: 'cars'},
    {path: '/add', component: AddCar, name: 'add'},
    {path: '/edit/:id', component: AddCar, name: 'edit-car'},
];

export const router = new VueRouter({
    mode: 'history', //da nam skloni hashtag(#) sa rute
    routes
});

//import {router} from... - tako importujemo router.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './app.vue';
import i18n from './i18n/i18n';
import {store} from './service/store';
import routeConfig from './config/route';

Vue.use(VueRouter);
const router = new VueRouter({
    routes: routeConfig
});
router.push('/');

new Vue({
    i18n,
    el: '#app',
    router,
    store,
    template: '<app/>',
    components: { app }
});

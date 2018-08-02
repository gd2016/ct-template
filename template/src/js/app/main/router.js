import Vue from 'vue';
import App from './component/app';
import VueRouter from 'vue-router';
import edit from './component/edit';
import add from './component/add';
export default new VueRouter({
    routes: [{
        path: '/',
        redirect: '/app'
    }, {
        path: '/app',
        component: App,
        children: [{
            path: 'edit',
            component: edit
        }, {
            path: 'add',
            component: add
        }]
    }, {
        path: '/no-permission',
        component: Vue.component('no-permission')
    }]
});


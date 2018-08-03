import Vue from 'vue';
import App from './component/app';
import VueRouter from 'vue-router';{{#editOperation}}
import edit from './component/edit';{{/editOperation}}{{#addOperation}}
import add from './component/add';{{/addOperation}}
export default new VueRouter({
    routes: [{
        path: '/',
        redirect: '/app'
    }, {
        path: '/app',
        component: App,
        children: [{
            path: 'edit'{{#editOperation}},
            component: edit{{/editOperation}}
        },
        {
            path: 'add'{{#addOperation}},
            component: add{{/addOperation}}
        }]
    }, {
        path: '/no-permission',
        component: Vue.component('no-permission')
    }]
});


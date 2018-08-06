import Vue from 'vue';
import App from './component/app';
import VueRouter from 'vue-router';{{#operation.edit}}
import edit from './component/edit';{{/operation.edit}}{{#operation.add}}
import add from './component/add';{{/operation.add}}
export default new VueRouter({
    routes: [{
        path: '/',
        redirect: '/app'
    }, {
        path: '/app',
        component: App,
        children: [{
            path: 'edit'{{#operation.edit}},
            component: edit{{/operation.edit}}
        },
        {
            path: 'add'{{#operation.add}},
            component: add{{/operation.add}}
        }]
    }, {
        path: '/no-permission',
        component: Vue.component('no-permission')
    }]
});


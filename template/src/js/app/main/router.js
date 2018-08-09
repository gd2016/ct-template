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
        children: [{{#operation.edit}}{ 
            path: 'edit',
            component: edit
        }{{/operation.edit}}{{#if_and operation.add operation.edit}},{{/if_and}}
        {{#operation.add}}{ 
            path: 'add',
            component: add
        }{{/operation.add}}]
    }]
});


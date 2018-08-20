import App from './component/app';
import VueRouter from 'vue-router';{{#if_and !ishandle operation.edit}}
import edit from './component/edit';{{/if_and}}{{#if_and !ishandle operation.edit}}
import add from './component/add';{{/if_and}}{{#operation.view}}
import view from './component/view';{{/operation.view}}{{#ishandle}}
import handle from './component/handle';{{/ishandle}}

export default new VueRouter({
    routes: [{
        path: '/',
        redirect: '/app'
    }, {
        path: '/app',
        component: App,
        children: [{{#if_and !ishandle operation.edit}}{ 
            path: 'edit',
            component: edit
        },{{/if_and}}{{#operation.view}}
        { 
            path: 'view',
            component: view
        },{{/operation.view}}{{#if_and !ishandle operation.add}}{ 
            path: 'add',
            component: add
        },{{/if_and}}{{#ishandle}}{ 
            path: ':handle',
            component: handle
        }{{/ishandle}}]
    }]
});


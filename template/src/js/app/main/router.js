import App from './component/app';
import VueRouter from 'vue-router';{{#operation.edit}}
import edit from './component/edit';{{/operation.edit}}{{#operation.add}}
import add from './component/add';{{/operation.add}}{{#operation.view}}
import view from './component/view';{{/operation.view}}
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
        },{{/operation.edit}}{{#operation.view}}
        { 
            path: 'view',
            component: view
        },{{/operation.view}}{{#operation.add}}{ 
            path: 'add',
            component: add
        }{{/operation.add}}]
    }]
});


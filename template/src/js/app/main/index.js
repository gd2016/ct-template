import Vue from 'vue';
import router from './router';
import VueRouter from 'vue-router';
import {table, column} from 'ct-adc-list'; //全局注册表格插件
import Loading from 'ct-adc-loading';      //loading状态
import miniMsg from 'ct-adc-mini-msg';     //弱提示
// import permission from 'common/permission';//权限
import 'common/vue-filter';                //全局过滤器
{{#operation.delete}}import Popper from 'ct-adc-popper';
Vue.use(Popper);{{/operation.delete}}
import {ctForm, formItem} from 'ct-adc-formitem';
import {DatesInput, DateInput} from 'ct-adc-date'; 
import AutoComplete from 'ct-adc-auto-complete';
import slideout from 'ct-adc-slideout';
Vue.component('slideout', slideout);
Vue.component('ctForm', ctForm);
Vue.component('formItem', formItem);
Vue.component('adc-table', table);
Vue.component('adc-column', column);
Vue.component('DatesInput', DatesInput);
Vue.component('DateInput', DateInput);
Vue.component('AutoComplete', AutoComplete);
Vue.use(VueRouter);
Vue.use(Loading);
Vue.use(miniMsg);
// permission.route(router);
// permission.get('pageName').then(function(){
new Vue({
    el: '#app',
    router
});
// });



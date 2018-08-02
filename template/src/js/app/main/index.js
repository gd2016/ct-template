import Vue from 'vue';
import router from './router';
import VueRouter from 'vue-router';
import {table, column} from 'ct-adc-list'; //全局注册表格插件
import Loading from 'ct-adc-loading';      //loading状态
import miniMsg from 'ct-adc-mini-msg';     //若提示
// import permission from 'common/permission';//权限
import 'common/vue-filter';                //过滤器
Vue.use(VueRouter);
Vue.use(Loading);
Vue.use(miniMsg);
Vue.component('adc-table', table);
Vue.component('adc-column', column);
// permission.route(router);
// permission.get('pageName').then(function(){
new Vue({
    el: '#app',
    router
});
// });



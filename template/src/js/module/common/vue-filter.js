/**
 * @author rubyisapm
 */
import utility from 'ct-utility';
import Vue from 'vue';
Vue.filter('dateTimeFormat', function(v){
    return utility.dateFilter('yyyy/MM/dd HH:mm:ss', v);
});

{{#operation.edit}}export const editRules = {
};
{{/operation.edit}}

{{#ishandle}}
export const handleRules = { {{#each_handle handleInfo}}
    {{#if_is @index @length}}{{@field}}: [{required: true, message: '{{@label}}不能为空'}]{{else}}{{@field}}: [{required: true, message: '{{@label}}不能为空'}],{{/if_is}}{{/each_handle}}
};
{{/ishandle}}
{{#operation.add}}export const addRules = {
    
}
;
{{/operation.add}}
//eg
// export const actConfigRules = {
//     DailyLimit: [
//                  { required: true, message: '每日投入上限不能为空'},
//                  {pattern: /^(0|[1-9][0-9]*)$/, message: '格式不正确'}
//                 ],//多项规则使用数组
//     custom:[custom]
// };
// var custom = {
//     validator:(rule,value,callback)=>{
//         if(/^[0-9]+$/.test(value) == false){
//             callback(new Error(vue.$t('number')));
//         }else{
//             callback();
//         }
//     }
// }
//官网 ：https://github.com/yiminghe/async-validator
//中文说明：https://blog.csdn.net/langxifu/article/details/80942501

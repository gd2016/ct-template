{{#operation.edit}}export const editRules = {
    {{#each_item editCount "edit_"}}{{@field}}: [{required: true, message: '{{@label}}不能为空'}],
        {{/each_item}}
};
{{/operation.edit}}

{{#operation.add}}export const addRules = {
    {{#each_item addCount "add_"}}{{@field}}: [{required: true, message: '{{@label}}不能为空'}],
        {{/each_item}}
}
;
{{/operation.add}}
//eg
// export const actConfigRules = {
//     DailyLimit: [
//                  { required: true, message: '每日投入上限不能为空'},
//                  {pattern: /^(0|[1-9][0-9]*)$/, message: '格式不正确'}
//                 ],
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
//https://github.com/yiminghe/async-validator
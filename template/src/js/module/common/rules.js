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

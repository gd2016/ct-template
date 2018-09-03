<template>
    <form v-if="!searchForm" class="form-horizontal">
        <slot></slot>
        <div class="text-right">
            <hr/>
            <div v-if="!$slots.footer">
                <button :disabled="loading" type="button" @click="save" class="btn btn-primary mr20">
                    <i class="glyphicon mr5" :class="{'glyphicon-refresh':loading, rotate:loading, 'glyphicon-save':!loading}"></i>保存</button>
                <button type="button" @click="cancel" class="btn btn-primary">取消</button>
                <slot name="append"></slot>
            </div>
            <slot name="footer"></slot>
        </div>
    </form>
    <div v-else class="well well-sm clearfix">
        <form action="javascript:;" class="form-horizontal form-horizontal-sm">
            <div :class="wrapClass?wrapClass:'col-sm-11'" class="text-nowrap">
                <slot></slot>
            </div>
            <div class="text-right" :class="btnClass?btnClass:'col-sm-1'">
                <div class="form-group form-group-sm">
                    <button :disabled="loading" @click="search" class="btn btn-sm btn-primary">
                        <i class="glyphicon" :class="{'glyphicon-refresh':loading, rotate:loading, 'glyphicon-search':!loading}"></i>
                        搜索
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'CtForm',
    data() {
        return {
            items: [] 
        };
    },
    methods: {
        validate(callback) {
            var valid = true;
            var count = 0;

            if (this.items.length){
                this.items.forEach(field => {
                    field.validate((message, invalidFields)=>{
                        if (message){
                            valid = false;
                        }
                        if (typeof callback === 'function' && ++count === this.items.length) {
                            callback(valid, invalidFields);
                        }
                    });
                });
            } else {
                callback(valid);
            }
        },
        resetFields() {
            if (!this.model) {
                console.warn('model is required for resetFields to work.');
                return;
            }
            this.items.forEach(field => {
                field.resetField();
            });
        },
        save() {
            this.$emit('save');
        },
        cancel() {
            this.$emit('cancel');
        },
        search(){
            this.$emit('search');
        }
    },
    props: {
        loading: Boolean,
        btnClass: String,
        wrapClass: String,
        searchForm: Boolean, //搜索用标志
        model: [Object, Array],      //表单数据对象
        rules: Object       //校验具体规则
    },
    created() {
        this.$on('form.addField', (field) => {
            if (field) {
                this.items.push(field);
            }
        });
        this.$on('form.removeField', (field) => {
            if (field) {
                this.items.splice(this.items.indexOf(field), 1);
            }
        });
    }
};
</script>

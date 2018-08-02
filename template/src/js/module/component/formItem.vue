<template>
    <div v-if="isSearch" class="col-sm-3">
        <div class="form-group form-group-sm">
            <label class="control-label" :class="labelClass?labelClass:'col-sm-4'">\{{label}}</label>
            <div class="col-sm-8" :class="{'has-error': validateState==='error'}">
                <section v-if="type==='text'">
                    <input :placeholder="placeholder" @keyup="handleUp" :maxlength="maxlength" @input="handleInput" type="text" class="form-control" :value="inputValue" />
                </section>
                <section v-if="type==='select'">
                    <select class="form-control" :value="selectValue" @change="handleChange">
                        <option value="" v-if="defaultSelect">请选择</option>
                        <option v-for="(item,index) in selectList" :value="item[valueKey.key]" :key="index">\{{item[valueKey.value]}}</option>
                    </select>
                </section>
                <section v-if="!type"><slot></slot></section>
            </div>
        </div>
    </div>
    <div v-else class="form-group clearfix">
        <label :class="labelClass?labelClass:'col-sm-3'" class="control-label">
            <i v-if="required" class="red">*</i>\{{label}}
        </label>
        <div v-if="isStatic" :class="[{'form-control-static':isStatic},valueClass?valueClass:'col-sm-9']">
            \{{value}}
            <slot></slot>
        </div>
        <div v-if="!isStatic" :class="[{'has-error': validateState==='error'},valueClass?valueClass:'col-sm-9']">
            <section v-if="type==='text'">
                <input :disabled="disabled" :placeholder="placeholder" @keyup="handleUp" :maxlength="maxlength" @input="handleInput" type="text" class="form-control" :value="inputValue" />
            </section>
            <section v-if="type==='select'">
                <select class="form-control" :value="selectValue" @change="handleChange">
                    <option value="" v-if="defaultSelect">请选择</option>
                    <option v-for="(item,index) in selectList" :value="item[valueKey.key]" :key="index">\{{item[valueKey.value]}}</option>
                </select>
            </section>
            <section v-if="type==='textarea'">
                <textarea :disabled="disabled"  @keyup="handleUp" :maxlength="maxlength" @input="handleInput" :placeholder="placeholder" :value="inputValue" style="max-width:100%" class="form-control"></textarea>
            </section>
            <slot></slot>
            <span v-if="validateState==='error'" class="help-block text-danger">
            <span class="glyphicon glyphicon-remove-sign"></span> \{{ validateMessage }}</span>
        </div>
    </div>
    
</template>

<script>
import AsyncValidator from 'async-validator';
export default {
    props: {
        prop: [String, Array],
        label: String,
        labelClass: String,
        valueClass: String,
        isStatic: Boolean,
        value: [String, Number],
        type: String,
        selectList: Array,
        valueKey: {
            type: Object, 
            default: ()=>{
                return {
                    key: 'key', value: 'val'
                };
            }
        },
        disabled: Boolean,
        maxlength: {type: [String, Number]},
        defaultSelect: {type: Boolean, default: false},
        placeholder: String
    },
    data() {
        return {
            validateState: '',
            validateMessage: '',
            inputValue: this.value,
            selectValue: this.value,
            reset: false
        };
    },
    methods: {
        validate(callback){
            const descriptor = {};

            descriptor[this.prop] = this.form.rules[this.prop];
            const validator = new AsyncValidator(descriptor);
            const model = {};

            model[this.prop] = this.form.model;
            validator.validate(this.form.model, (errors, invalidFields) => {
                this.validateState = !errors ? 'success' : 'error';
                this.validateMessage = errors ? errors[0].message : '';
                callback(this.validateMessage, invalidFields);
                this.reset = false;
            });
        },
        resetField(){
            this.reset = true;
            if (this.form.model){
                this.inputValue = '';
                this.selectValue = '';
            }
            this.validateState = '';
            this.validateMessage = '';
        },
        handleInput(event) {
            const value = event.target.value;

            this.setInputValue(value);
            this.$emit('input', value); //与v-model绑定
        },
        handleChange(event){
            const value = event.target.value;

            this.setSelectValue(value);
            this.$emit('input', value);
        },
        handleUp(){
            if (this.pattern && this.inputValue){
                this.inputValue = this.inputValue.replace(this.pattern, '');
            }
        },
        setInputValue(val){
            this.inputValue = val;
        },
        setSelectValue(val){
            this.selectValue = val;
        }
    },
    computed: {
        isSearch(){
            return this.$parent.searchForm;
        },
        form(){
            if (!this.prop) return ;
            let parent = this.$parent;
            let parentName = parent.$options.name;

            while (parentName !== 'CtForm') {
                parent = parent.$parent;
                parentName = parent.$options.name;
            }
            return parent;
        },
        filedvalue(){
            if (!this.prop) return ;
            if (this.form.model){
                return this.form.model[this.prop];
            }
        },
        required(){
            if (!this.prop) return ;
            var rules = this.form.rules[this.prop];

            for (let index = 0; index < rules.length; index++) {
                if (rules[index].required){
                    return true;
                }
            }
            return false; 
        }
    },
    watch: {
        filedvalue(){
            if (this.reset) return ;
            this.validate(()=>{});   
        },
        value(val){
            if (this.type === 'text' || this.type === 'textarea') this.setInputValue(val);
            else this.setSelectValue(val);
        }
    },
    mounted() {
        if (this.prop){
            this.form.$emit('form.addField', this);
        }
    },
    beforeDestroy() {
        if (this.prop){
            this.form.$emit('form.removeField', this);
        }
    }
};
</script>

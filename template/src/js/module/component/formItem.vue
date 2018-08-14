<template>
    <div v-if="isSearch" class="col-sm-3">
        <div class="form-group form-group-sm">
            <label class="control-label" :class="labelClass?labelClass:'col-sm-4'">\{{label}}</label>
            <div class="col-sm-8" :class="{'has-error': validateState==='error'}">
                <section v-if="type==='text'||type==='input'">
                    <input :placeholder="placeholder"  :maxlength="maxlength" @input="handleChange" type="text" class="form-control" :value="commonValue" />
                </section>
                <section v-if="type==='select'">
                    <select class="form-control" :value="commonValue" @change="handleChange">
                        <option value="" v-if="defaultSelect">请选择</option>
                        <option v-for="(item,index) in list" :value="item[valueKey.key]" :key="index">\{{item[valueKey.value]}}</option>
                    </select>
                </section>
                <section v-if="type==='dates'">
                    <dates-input v-model="datesValue" :beginPlaceholder="beginPlaceholder" :endPlaceholder="endPlaceholder" @change="updateTime" ></dates-input>
                </section>
                <section v-if="type==='date'">
                    <date-input ref="date" v-model="commonValue" :placeholder="placeholder" @change="handleChange" ></date-input>
                </section>
                <section v-if="type==='autoComplete'">
                    <auto-complete  
                        :list="list"
                        :placeholder="placeholder"  @select="selectComplete"
                        v-model="commonValue"  @change="handleChange"
                        :match-keys="matchKeys" 
                        :keys="keys" 
                        :show-keys="showKeys"
                    >
                    </auto-complete>
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
        <div v-if="!isStatic" :class="[{'form-error': validateState==='error'},valueClass?valueClass:'col-sm-9']">
            <section v-if="type==='text'||type==='input'">
                <input :disabled="disabled" :placeholder="placeholder" :maxlength="maxlength" @input="handleChange" type="text" class="form-control" :value="commonValue" />
            </section>
            <section v-if="type==='select'">
                <select class="form-control" :value="commonValue" @change="handleChange">
                    <option value="" v-if="defaultSelect">请选择</option>
                    <option v-for="(item,index) in list" :value="item[valueKey.key]" :key="index">\{{item[valueKey.value]}}</option>
                </select>
            </section>
            <section v-if="type==='radio'">
                <label  class="radio-inline" v-for="(item,index) in list" :key="index" @change="handleChange">
                    <input :checked="value==item[valueKey.key]" name="radio" type="radio" :value="item[valueKey.key]">\{{item[valueKey.value]}}
                </label>
            </section>
            <section v-if="type==='checkbox'">
                <label class="checkbox-inline" v-for="(item,index) in list" :key="index" @change="handleChange">
                    <input v-model="commonValue" type="checkbox" :value="item[valueKey.key]">\{{item[valueKey.value]}}
                </label>
            </section>
            <section v-if="type==='dates'">
                <dates-input v-model="datesValue" :beginPlaceholder="beginPlaceholder" :endPlaceholder="endPlaceholder" @change="updateTime" ></dates-input>
            </section>
            <section v-if="type==='date'">
                <date-input ref="date" v-model="commonValue" :placeholder="placeholder" @change="handleChange" ></date-input>
            </section>
            <section v-if="type==='autoComplete'">
                <auto-complete  
                    :list="list"
                    :placeholder="placeholder"  @select="selectComplete"
                    v-model="commonValue"  @change="handleChange"
                    :match-keys="matchKeys" 
                    :keys="keys" 
                    :show-keys="showKeys"
                >
                </auto-complete>
            </section>
            <section v-if="type==='textarea'">
                <textarea :disabled="disabled" :maxlength="maxlength" @input="handleChange" :placeholder="placeholder" :value="commonValue" style="max-width:100%" class="form-control"></textarea>
            </section>
            <slot></slot>
            <span v-if="validateState==='error'" class="error-msg help-block">
            <span class="glyphicon glyphicon-remove-sign"></span> \{{ validateMessage }}</span>
        </div>
    </div>
    
</template>

<script>
import AsyncValidator from 'async-validator';
import {DateInput, DatesInput} from 'ct-adc-date';
import AutoComplete from 'ct-adc-auto-complete';
export default {
    components: {
        DatesInput, DateInput, AutoComplete
    },
    props: {
        prop: [String, Array], //需要校验的字段
        label: String,         //表单项
        labelClass: String,    //label类名
        valueClass: String,    //value类名
        isStatic: Boolean,     //是否只读
        value: [String, Number, Object, Array], //v-model绑定值
        type: String,          //表单项类型
        list: Array,           //选择框、单选框、模糊匹配列表
        disabled: Boolean,
        maxlength: {type: [String, Number]},
        defaultSelect: {type: Boolean, default: false}, //是否显示请选择一项
        placeholder: String,        
        beginPlaceholder: String, //dates组件placeholder
        endPlaceholder: String,  //dates组件placeholder
        autoSelectIfOne: Boolean, //模糊匹配框属性
        allForEmpty: Boolean,  
        autoClear: Boolean,
        matchKeys: Array,
        keys: Array,
        showKeys: Array,       
        keyfield: {type: String, default: 'key'}, //模糊匹配v-model绑定的键名
        valueKey: {            //定义选择框的value key采用的字段名称
            type: Object, 
            default: ()=>{
                return {
                    key: 'key', value: 'val'
                };
            }
        },
        index: Number
    },
    data() {
        return {
            validateState: '',
            validateMessage: '',
            datesValue: this.value,
            reset: false,          //重置校验规则
            commonValue: this.value
        };
    },
    methods: {
        validate(callback){
            const descriptor = {};

            descriptor[this.prop] = this.form.rules[this.prop];
            const validator = new AsyncValidator(descriptor);
            const model = {};

            model[this.prop] = this.filedvalue;
            validator.validate(model, (errors, invalidFields) => {
                this.validateState = !errors ? 'success' : 'error';
                this.validateMessage = errors ? errors[0].message : '';
                callback(this.validateMessage, invalidFields);
                this.reset = false;
            });
        },
        resetField(){  //重置所有校验项的提示信息
            this.reset = true;
            if (this.form.model){
                this.commonValue = '';
                this.datesValue = {
                    begin: '',
                    end: ''
                };
            }
            this.validateState = '';
            this.validateMessage = '';
        },
        handleChange(event){
            var value = '';

            if (this.type === 'date'){
                value = this.$refs.date.getDate();
            } else if (this.type === 'autoComplete'){
                value = event;
            } else {
                value = event.target.value;
            }
            if (this.type === 'checkbox'){
                this.$emit('input', this.commonValue);
                this.$emit('change', this.commonValue);    
            } else {
                this.setValue(value);
                this.$emit('input', value);
                this.$emit('change', value);
            }
        },
        setValue(val){
            this.commonValue = val;
        },
        updateTime(){
            this.$emit('input', this.datesValue);
            this.$emit('change', this.datesValue);
        },
        selectComplete(obj){
            this.setValue(obj[this.keyfield].toString());
            this.$emit('input', obj[this.keyfield].toString());
            this.$emit('select', obj);
        }
    },
    computed: {
        isSearch(){  //判断是否是搜索项
            return this.$parent.searchForm;
        },
        form(){  //表单对象
            if (!this.prop) return ;
            let parent = this.$parent;
            let parentName = parent.$options.name;

            while (parentName !== 'CtForm') {
                parent = parent.$parent;
                parentName = parent.$options.name;
            }
            return parent;
        },
        filedvalue(){ //当前表单项对应的值
            if (!this.prop) return ;
            if (typeof this.value === 'undefined'){
                if (this.form.model instanceof Array){
                    return this.form.model[this.index][this.prop];
                }
                return this.form.model[this.prop];
            }
            
            return this.value;
        },
        required(){ //是否为必填项
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
            this.setValue(val);
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
<style>
.form-error .form-control{
    border-color: #a94442;
}
.error-msg{
    color: #a94442;
}
</style>

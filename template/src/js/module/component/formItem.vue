<template>
    <div v-if="isSearch" class="col-sm-4 col-lg-3">
        <div class="form-group form-group-sm">
            <label class="control-label" :class="labelClass?labelClass:'col-sm-4'">\{{label}}</label>
            <div class="col-sm-8" :class="{'has-error': validateState==='error'}">
                <section :class="inputClass">
                    <input  v-if="type==='text'||type==='number'" :placeholder="placeholder"          
                            :maxlength="maxlength" :style="inputStyle"
                            type="text" class="form-control" :value="commonValue" :disabled="disabled" v-bind="$attrs"
                            @blur="handleBlur" @input="handleChange" @focus="handleFocus" ref="input"
                            />
                    <select v-if="type==='select'" class="form-control" :value="commonValue" @change="handleChange"
                            :disabled="disabled" v-bind="$attrs" ref="select" :style="inputStyle">
                            <option value="" v-if="defaultSelect">请选择</option>
                            <option v-for="(item,index) in list" :value="item[valueKey.key]" :key="index">\{{item[valueKey.value]}}</option>
                    </select>
                    <dates-input v-if="type==='dates'" v-model="datesValue" :begin-ops="beginOps" :end-ops="endOps"
                                 :beginPlaceholder="beginPlaceholder" :endPlaceholder="endPlaceholder" @change="updateTime" 
                                 :beginDisabled="beginDisabled" :endDisabled="endDisabled" :valueReadable="valueReadable"
                                 :valueEndTransfered="valueEndTransfered"></dates-input>
                    <date-input v-if="type==='date'" v-model="datesValue" :placeholder="placeholder" @change="updateTime" 
                                :ops="ops" :valueReadable="valueReadable" ></date-input>
                    <auto-complete  v-if="type==='autoComplete'" :list="list" :placeholder="placeholder"  
                                    @select="selectComplete" v-model="commonValue"  @change="handleChange"
                                    :match-keys="matchKeys" :keys="keys" :show-keys="showKeys"
                                    :disabled="disabled" :maxlength="maxlength" :caseSensitive="caseSensitive"
                                    :autoClear="autoClear" :autoSelectIfOne="autoSelectIfOne"
                                    @clear="handleClear">
                    </auto-complete>
                </section>
                <slot></slot>
            </div>
        </div>
    </div>
    <div v-else class="form-group clearfix">
        <label :class="labelClass?labelClass:'col-sm-3'" class="control-label">
            <i v-if="isRequired" class="red">*</i>\{{label}}
        </label>
        <div v-if="isStatic" :class="[{'form-control-static':isStatic},valueClass?valueClass:'col-sm-9']">
            \{{value}}
            <slot></slot>
        </div>
        <div v-if="!isStatic" :class="[{'form-error': validateState==='error'},valueClass?valueClass:'col-sm-9']">
            <section :class="inputClass">
                <input  v-if="type==='text'" :placeholder="placeholder" :maxlength="maxlength" :style="inputStyle"
                        type="text" class="form-control" :value="commonValue" :disabled="disabled" v-bind="$attrs"
                        @blur="handleBlur" @input="handleChange" @focus="handleFocus" ref="input" />
                <select v-if="type==='select'" class="form-control" :value="commonValue" @change="handleChange"
                        :disabled="disabled" v-bind="$attrs" ref="select" :style="inputStyle">
                        <option value="" v-if="defaultSelect">请选择</option>
                        <option v-for="(item,index) in list" :value="item[valueKey.key]" :key="index">\{{item[valueKey.value]}}</option>
                </select>
                <label v-if="type==='radio'" class="radio-inline" v-for="(item,index) in list" :key="index" @change="handleChange">
                    <input :style="inputStyle" :checked="value==item[valueKey.key]" name="radio" type="radio" :value="item[valueKey.key]">\{{item[valueKey.value]}}
                </label>
                <label v-if="type==='checkbox'" class="checkbox-inline" v-for="(item,index) in list" :key="index" @change="handleChange">
                    <input :style="inputStyle" v-model="commonValue" type="checkbox" :value="item[valueKey.key]">\{{item[valueKey.value]}}
                </label>
                <dates-input v-if="type==='dates'" v-model="datesValue" :begin-ops="beginOps" :end-ops="endOps"
                            :beginPlaceholder="beginPlaceholder" :endPlaceholder="endPlaceholder" @change="updateTime" 
                            :beginDisabled="beginDisabled" :endDisabled="endDisabled" :valueReadable="valueReadable"
                            :valueEndTransfered="valueEndTransfered"></dates-input>
                <date-input v-if="type==='date'" v-model="datesValue" :placeholder="placeholder" @change="updateTime" 
                            :ops="ops" :valueReadable="valueReadable" ></date-input>
                <auto-complete v-if="type==='autoComplete'" :list="list" :placeholder="placeholder" 
                                v-model="commonValue"   :match-keys="matchKeys" :keys="keys" :show-keys="showKeys"
                                :disabled="disabled" :maxlength="maxlength" :caseSensitive="caseSensitive"
                                :autoClear="autoClear" :autoSelectIfOne="autoSelectIfOne"
                                @change="handleChange"  @select="selectComplete"
                                @clear="handleClear">
                </auto-complete>
                <textarea v-if="type==='textarea'" :disabled="disabled" :maxlength="maxlength"
                          @input="handleChange" :placeholder="placeholder" :value="commonValue" 
                          style="min-height:100px;max-width:100%" class="form-control" :style="inputStyle"></textarea>
            </section>
            <slot></slot>
            <span v-if="validateState==='error'" class="error-msg help-block">
            <span class="glyphicon glyphicon-remove-sign"></span> \{{ validateMessage }}</span>
        </div>
    </div>
    
</template>

<script>
import AsyncValidator from 'async-validator';
export default {
    props: {
        rules: Array,          //单独的校验规则
        prop: [String, Array], //需要校验的字段
        label: String,         //表单项
        labelClass: String,    //label类名
        inputClass: String,    //input类名
        inputStyle: Object,    //控件样式
        valueClass: String,    //value类名
        isStatic: Boolean,     //是否只读
        value: [String, Number, Object, Array, Boolean], //v-model绑定值
        type: String,          //表单项类型
        list: Array,           //选择框、单选框、复选框、模糊匹配列表
        disabled: Boolean,     //是否禁用
        maxlength: [String, Number], //input最大长度限制
        defaultSelect: Boolean, //是否显示请选择一项
        placeholder: String,        
        beginPlaceholder: String, //dates组件placeholder
        endPlaceholder: String,  //dates组件placeholder
        beginDisabled: Boolean,
        endDisabled: Boolean,
        beginOps: Object,
        endOps: Object,
        ops: Object,
        valueReadable: Boolean,
        valueEndTransfered: Boolean, // 时间戳的值是否精确到毫秒
        autoSelectIfOne: Boolean, //模糊匹配框属性
        allForEmpty: Boolean,  
        caseSensitive: Boolean,
        autoClear: Boolean,
        matchKeys: Array,
        keys: Array,
        showKeys: Array,       
        index: Number,
        required: Boolean,
        valueKey: {            //定义选择框、单选框、复选框的value key采用的字段名称
            type: Object, 
            default: ()=>{
                return {
                    key: 'key', value: 'val'
                };
            }
        }
    },
    data() {
        return {
            validateState: '',
            validateMessage: '',
            datesValue: this.value,
            commonValue: this.value,
            validated: false
        };
    },
    methods: {
        getRules(){
            const formRules = this.form.rules[this.prop];
            const selfRules = this.rules;

            return [].concat(selfRules || formRules);
        },
        validate(callback){
            const descriptor = {};

            descriptor[this.prop] = this.getRules();
            const validator = new AsyncValidator(descriptor);
            const model = {};

            model[this.prop] = this.filedvalue;
            validator.validate(model, (errors, invalidFields) => {
                if (this.disabled || this.beginDisabled || this.endDisabled){
                    this.validateState = 'success';
                    this.validateMessage = '';
                } else {
                    this.validateState = !errors ? 'success' : 'error';
                    this.validateMessage = errors ? errors[0].message : '';
                }
                callback(this.validateMessage, invalidFields);
                if(!this.validated) this.validated = true; 
            });
        },
        resetField(){  //重置所有校验项的提示信息
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
        handleBlur(event){
            if (this.trigger === 'blur') {
                this.validate(()=>{});
            }
            this.$emit('blur', event.target.value);
        },
        handleFocus(event){
            this.$emit('focus', event);
        },
        setValue(val){
            this.commonValue = val;
        },
        updateTime(){
            this.$emit('input', this.datesValue);
            this.$emit('change', this.datesValue);
        },
        selectComplete(obj){
            this.$emit('select', obj);
        },
        handleClear(){
            this.$emit('clear');
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
        isRequired(){ //是否为必填项
            if (this.required) return true;
            if (!this.prop) return ;
            var rules = this.getRules();

            for (let index = 0; index < rules.length; index++) {
                if (rules[index].required){
                    return true;
                }
            }
            return false; 
        },
        trigger(){
            if (!this.prop) return;
            const rules = this.getRules();
            var type = '';

            for (let i = 0; i < rules.length; i++) {
                if (rules[i].trigger){
                    type = rules[i].trigger;
                }
            }
            
            return type;
        }
    },
    watch: {
        filedvalue(){
            if (this.trigger === 'blur') return;
            if (!val && !this.validated) return;
            this.validate(()=>{});   
        },
        value(val){
            this.setValue(val);
        },
        disabled(){
            this.validateState = 'success';
            this.validateMessage = '';
        },
        beginDisabled(){
            this.validateState = 'success';
            this.validateMessage = '';
        },
        endDisabled(){
            this.validateState = 'success';
            this.validateMessage = '';
        },
        commonValue(value){
            if(this.type==='number'){
                this.commonValue = this.commonValue.replace(/\D/g, '');
                this.$emit('input', this.commonValue);
            }
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
.help-block{
    clear: both;
}
.form-group section{
    padding-left: 0;
}
.form-error .form-control{
    border-color: #a94442;
}
.error-msg{
    color: #a94442;
}
</style>

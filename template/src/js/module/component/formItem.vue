<template>
    <div v-if="isSearch" class="col-sm-3">
        <div class="form-group form-group-sm">
            <label class="control-label" :class="labelClass?labelClass:'col-sm-4'">\{{label}}</label>
            <div class="col-sm-8" :class="{'has-error': validateState==='error'}">
                <section v-if="type==='text'">
                    <input :placeholder="placeholder"  :maxlength="maxlength" @input="handleChange" type="text" class="form-control" :value="commonValue" />
                </section>
                <section v-if="type==='select'">
                    <select class="form-control" :value="commonValue" @change="handleChange">
                        <option value="" v-if="defaultSelect">请选择</option>
                        <option v-for="(item,index) in selectList" :value="item[valueKey.key]" :key="index">\{{item[valueKey.value]}}</option>
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
                        :list="completeList"
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
        <div v-if="!isStatic" :class="[{'has-error': validateState==='error'},valueClass?valueClass:'col-sm-9']">
            <section v-if="type==='text'">
                <input :disabled="disabled" :placeholder="placeholder" :maxlength="maxlength" @input="handleChange" type="text" class="form-control" :value="commonValue" />
            </section>
            <section v-if="type==='select'">
                <select class="form-control" :value="commonValue" @change="handleChange">
                    <option value="" v-if="defaultSelect">请选择</option>
                    <option v-for="(item,index) in selectList" :value="item[valueKey.key]" :key="index">\{{item[valueKey.value]}}</option>
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
                    :list="completeList"
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
            <span v-if="validateState==='error'" class="help-block text-danger">
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
        prop: [String, Array],
        label: String,
        labelClass: String,
        valueClass: String,
        isStatic: Boolean,
        value: [String, Number, Object],
        type: String,
        selectList: Array,
        completeList: Array,
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
        placeholder: String,
        beginPlaceholder: String,
        endPlaceholder: String,
        autoSelectIfOne: Boolean,
        allForEmpty: Boolean,
        autoClear: Boolean,
        matchKeys: Array,
        keys: Array,
        showKeys: Array,
        keyfield: {type: String, default: 'key'}
    },
    data() {
        return {
            validateState: '',
            validateMessage: '',
            datesValue: this.value,
            reset: false,
            commonValue: this.value
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
                this.commonValue = '';
                this.datesValue = '';
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
            this.setValue(value);
            this.$emit('input', value);
            this.$emit('change', value);
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

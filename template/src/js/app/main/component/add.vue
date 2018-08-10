<template>
    <div>   
        <slideout width="60%" title="添加" v-model="show" @on-after-hide="back">
            <template slot="body">
                <ct-form v-loading="loading" :model="formData" ref="forms" :rules="rules">
                    {{#each_handle addInfo}}
                    {{#if_is @type 'select'}}<form-item v-model="formData.{{@field}}" type="{{@type}}" label="{{@label}}" :list="typeList" defaultSelect></form-item>{{else if_is @type 'autoComplete'}}<form-item v-model="formData.{{@field}}" type="{{@type}}" label="{{@label}}" :list="typeList" :matchKeys="['key','val']" :keys="['key','val']" :showKeys="['key','val']"></form-item>{{else if_is @type 'custom'}}<form-item label="{{@label}}"></form-item>{{else if_is @type 'checkbox'}}<form-item v-model="formData.{{@field}}" label="{{@label}}" :list="typeList"></form-item>{{else if_is @type 'radio'}}<form-item v-model="formData.{{@field}}" label="{{@label}}" :list="typeList"></form-item>{{else}}<form-item v-model="formData.{{@field}}" type="{{@type}}" label="{{@label}}"></form-item>{{/if_is}}
                    {{/each_handle}}
                    <template slot="footer">
                        <button :disabled="handleLoading" type="button" @click="save" class="btn btn-primary mr20">
                            <i class="glyphicon mr5" :class="{'glyphicon-refresh':handleLoading, rotate:handleLoading, 'glyphicon-save':!handleLoading}"></i>保存</button>
                        <button type="button" @click="show=false" class="btn btn-primary">取消</button>
                    </template>
                </ct-form>
            </template>
        </slideout>
    </div>
</template>

<script>
import ctForm from 'component/ctForm';
import formItem from 'component/formItem';
import slideout from 'ct-adc-slideout';
import mixin from 'common/loadMixin';
import Interface from 'common/interface';
import Const from 'common/const';
import {addRules} from 'common/rules';
export default {
    mixins: [mixin],
    data() {
        return {
            rules: addRules,
            show: false,
            saveShow: false,
            typeList: Const.getData({col: 'type'}),
            formData: {}
        };
    },
    mounted() {
        this.show = true;
    },
    methods: {
        save(){
            this.$refs.forms.validate((res)=>{
                if (res){
                    this.post({
                        url: Interface.statistics.post,
                        data: this.formData,
                        method: 'post'
                    }).then(()=>{
                        this.$emit('refresh');
                        this.show = false;
                    });
                }
            });
        },
        back(){
            this.$router.push({path: '/app'});
        }
    },
    components: {
        slideout, formItem, ctForm
    }
};
</script>

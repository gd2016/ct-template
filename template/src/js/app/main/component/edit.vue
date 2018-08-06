<template>
    <div>   
        <slideout width="60%" title="编辑" v-model="show" @on-after-hide="back">
            <template slot="body">
                <ct-form v-if="!error" v-loading="loading" :model="formData" ref="forms" :rules="rules">
                    {{#each_item editCount "edit_"}}{{#if_is @type 'select'}}<form-item prop="{{@field}}"  v-model="formData.{{@field}}" type="{{@type}}" label="{{@label}}" :selectList="TypeList" defaultSelect></form-item>{{else if_is @type 'autoComplete'}}<form-item prop="{{@field}}" v-model="formData.{{@field}}" type="{{@type}}" label="{{@label}}" :completeList="TypeList" :matchKeys="['key','val']" :keys="['key','val']" :showKeys="['key','val']"></form-item>{{else}}<form-item prop="{{@field}}" v-model="formData.{{@field}}" type="{{@type}}" label="{{@label}}"></form-item>{{/if_is}}                      
                        {{/each_item}}
                    <template slot="footer">
                        <button :disabled="handleLoading" type="button" @click="save" class="btn btn-primary mr20">
                            <i class="glyphicon mr5" :class="{'glyphicon-refresh':handleLoading, rotate:handleLoading, 'glyphicon-save':!handleLoading}"></i>保存</button>
                        <button type="button" @click="show=false" class="btn btn-primary">取消</button>
                    </template>
                </ct-form>
                <div v-if="error" class="error">\{{error}}</div>
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
import {editRules} from 'common/rules';
export default {
    mixins: [mixin],
    data() {
        return {
            rules: editRules,
            show: false,
            saveShow: false,
            TypeList: Const.getData({col: 'type'}),
            formData: {
                Id: this.$route.query.id,
                Remark: '',
                Name: null,
                Type: null
            }
        };
    },
    created() {
        this.getData(); 
    },
    mounted() {
        this.show = true;
    },
    methods: {
        getData(){
            this.getInfo({
                url: Interface.statistics.detail,
                data: {
                    Id: this.$route.query.id
                }
            }).then((res)=>{
                this.formData = res.Data;
            }).catch((error)=>{
                this.error = error.message;
            });
        },
        save(){
            this.$refs.forms.validate((res)=>{
                if (res){
                    this.post({
                        url: Interface.statistics.post,
                        data: this.formData,
                        method: 'post'
                    }).then(()=>{
                        this.show = false;
                        this.$emit('refresh', true);
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

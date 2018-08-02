<template>
    <div>   
        <slideout width="60%" title="添加" v-model="show" @on-after-hide="back">
            <template slot="body">
                <ct-form v-loading="loading" :model="formData" ref="forms" :rules="rules">
                    <form-item prop="Name" v-model="formData.Name" type="text" required label="名称:"></form-item>
                    <form-item prop="Type" defaultSelect required :selectList="TypeList" type="select" v-model="formData.Type" label="游戏类型:"></form-item>
                    <form-item type="textarea" v-model="formData.Remark" required label="备注:" ></form-item>
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
import {formRules} from 'common/rules';
export default {
    mixins: [mixin],
    data() {
        return {
            rules: formRules,
            show: false,
            saveShow: false,
            TypeList: Const.getData({col: 'type'}),
            formData: {
                Remark: '',
                Name: null,
                Type: null
            }
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

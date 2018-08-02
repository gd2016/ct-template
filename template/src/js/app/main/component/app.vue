<template>
    <div class="container-fluid">{{#if_eq operation "all" || searchOperation}}
        <ct-form  searchForm :loading="loading" @search="search">
            <form-item maxlength="30" v-model="searchInfo.Id" type="text" label="ID"></form-item>
            <form-item  defaultSelect :selectList="typeList"  v-model="searchInfo.Type" type="select" label="类型"></form-item>  
        </ct-form>{{/if_eq}}
        <div class="clearfix mb10">
            <button @click="add" type="button" class="btn btn-sm btn-primary pull-right"><span class="glyphicon glyphicon-plus"></span>添加</button>
        </div>
        <adc-table  :data="list" v-loading="loading"
                   :status="status"  :msg="message">
            <adc-column prop="Id" name="ID"></adc-column>
            <adc-column prop="Name" name="名称"></adc-column>
            <adc-column prop="CreateTime" filter="dateTimeFormat" name="时间"></adc-column>
            <adc-column prop="GrantState" :mapper="stateFormat" name="状态"></adc-column>  
            <adc-column :vm="{name: 'btn'}" name="操作"></adc-column> 
        </adc-table>
        <page form
            :curr-page="searchInfo.PageIndex"
            :page-len="searchInfo.PageSize"
            :total-num="count" @change-page="changePage"></page>
        <router-view @refresh="refresh"></router-view>
    </div>
</template>

<script>
import mixin from 'common/loadMixin';
import Interface from 'common/interface';
import page from 'ct-adc-page';
import ctForm from 'component/ctForm';
import formItem from 'component/formItem';
import Const from 'common/const';
import Vue from 'vue';
import btn from './btn';
Vue.component('btn', btn);
export default {
    data() {
        return {
            typeList: Const.getData({col: 'type'}),
            stateFormat: Const.getData({col: 'state'}),
            list: [],
            count: 0,
            searchInfo: {
                Type: null,
                Id: null,
                PageIndex: 1,
                PageSize: 15
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData(){
            this.getList({
                url: Interface.statistics.list,
                data: this.searchInfo
            }).then((res)=>{
                this.list = res.Data.List;
                this.count = res.Data.RecordCount;
            });
        }, 
        search(){
            this.searchInfo.PageIndex = 1;
            this.getData();
        },
        changePage(index){
            this.searchInfo.PageIndex = index;
            this.getData();
        },
        refresh(isEdit){
            if (isEdit) this.getData();
            else {
                this.searchInfo.PageIndex = 1;
                this.getData();
            }
        },
        add(){
            this.$router.push({path: '/app/add'});
        }
    },
    mixins: [mixin],
    components: {
        ctForm,
        formItem,
        page
    }
};
</script>
<style>
@import '~common.css';
</style>

<template>
    <div class="container-fluid">{{#operation.search}}
        <ct-form  searchForm :loading="loading" @search="search">
            {{#each_item searchCount "search_"}}
            {{#if_is @type 'select'}}<form-item v-model="searchInfo.{{@field}}" type="{{@type}}" label="{{@label}}" :selectList="typeList" defaultSelect></form-item>{{else if_is @type 'autoComplete'}}<form-item v-model="searchInfo.{{@field}}" type="{{@type}}" label="{{@label}}" :completeList="completeList" :matchKeys="['key','val']" :keys="['key','val']" :showKeys="['key','val']"></form-item>{{else}}<form-item v-model="searchInfo.{{@field}}" type="{{@type}}" label="{{@label}}"></form-item>{{/if_is}}
            {{/each_item}}
        </ct-form>{{/operation.search}}
        {{#operation.add}}<div class="clearfix mb10">
            <button @click="add" type="button" class="btn btn-sm btn-primary pull-right"><span class="glyphicon glyphicon-plus"></span>添加</button>
        </div>{{/operation.add}}
        <adc-table  :data="list" v-loading="loading"
                   :status="status"  :msg="message">
            <adc-column prop="Id" name="ID"></adc-column>
            <adc-column prop="Name" name="名称"></adc-column>
            <adc-column prop="CreateTime" filter="dateTimeFormat" name="时间"></adc-column>
            <adc-column prop="GrantState" :mapper="stateFormat" name="状态"></adc-column>{{#if_or operation.view operation.edit}} 
            <adc-column :vm="{name: 'btn'}" name="操作"></adc-column> {{/if_or}}
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
import Const from 'common/const';{{#if_or operation.view operation.edit}} 
import Vue from 'vue';
import btn from './btn';
Vue.component('btn', btn);{{/if_or}} 
export default {
    data() {
        return {
            typeList: Const.getData({col: 'type'}),
            completeList: Const.getData({col: 'type'}),
            stateFormat: Const.getData({col: 'state'}),
            list: [],
            count: 0,
            searchInfo: {
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
        }{{#operation.search}}, 
        search(){
            this.searchInfo.PageIndex = 1;
            this.getData();
        }{{/operation.search}},
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
        }{{#operation.add}},
        add(){
            this.$router.push({path: '/app/add'});
        }{{/operation.add}}
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

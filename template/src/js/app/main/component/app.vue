<template>
    <div class="container-fluid">{{#operation.search}},
        <search :searchInfo="searchInfo" :loading="loading" @search="search"></search>{{/operation.search}}{{#if_or operation.export operation.add}}
        <div class="clearfix mb10">{{#operation.export}}
            <export-btn :searchInfo="searchInfo" :url="exportUrl"></export-btn>{{/operation.export}}{{#operation.add}}
            <router-link :to="{path:'/app/add'}" class="pull-right btn btn-primary"><i class="glyphicon glyphicon-plus"></i>添加</router-link>{{/operation.add}}
        </div>{{/if_or}}
        <adc-table  :data="list" v-loading="loading" :status="status"  :msg="message">
            {{#each_column tableInfo}}
            {{#if_is @type 'date'}}<adc-column prop="{{@field}}" filter="dateTimeFormat" name="{{@label}}"></adc-column>{{else if_is @type 'select'}}<adc-column prop="{{@field}}" :mapper="stateFormat" name="{{@label}}"></adc-column>{{else}}<adc-column prop="{{@field}}" name="{{@label}}"></adc-column>{{/if_is}}
            {{/each_column}} 
            {{#if_or operation.view operation.edit}}
            <adc-column name="操作">
                <template slot-scope="data">{{#operation.view}}
                    <router-link :to="{path:'/app/view',query: { id: data.item.Id }}" class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-search"></i>查看</router-link>{{/operation.view}}{{#operation.edit}}
                    <router-link :to="{path:'/app/edit',query: { id: data.item.Id }}" class="btn btn-xs btn-primary"><i class="glyphicon glyphicon-edit"></i>编辑</router-link>{{/operation.edit}}
                </template>
            </adc-column>
            {{/if_or}}
        </adc-table>
        <page form :curr-page="pageCfg.PageIndex" :page-len="pageCfg.PageSize" :total-num="count" @change-page="changePage"></page>
        <router-view @refresh="refresh"></router-view>
    </div>
</template>

<script>{{#operation.export}}
import exportBtn from 'component/exportBtn';{{/operation.export}}{{#operation.search}}
import search from './search';{{/operation.search}}
import mixin from 'common/loadMixin';
import Interface from 'common/interface';
import page from 'ct-adc-page';
import ctForm from 'component/ctForm';
import formItem from 'component/formItem';
import Const from 'common/const';
export default {
    data() {
        return {
            typeList: Const.getData({col: 'type'}),
            stateFormat: Const.getData({col: 'state'}),
            list: [],
            count: 0,
            searchInfo: {},
            pageCfg: {
                PageIndex: 1,
                PageSize: 10
            }{{#operation.export}},
            exportUrl: Interface.statistics.post{{/operation.export}}
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData(){
            this.getList({
                url: Interface.statistics.list,
                data: this.pageCfg
            }).then((res)=>{
                this.list = res.Data.List;
                this.count = res.Data.RecordCount;
            });
        }{{#operation.search}}, 
        search(){
            this.pageCfg = Object.assign(this.pageCfg, this.searchInfo);
            this.pageCfg.PageIndex = 1;
            this.count = 0;
            this.getData();
        }{{/operation.search}},
        changePage(index){
            this.pageCfg.PageIndex = index;
            this.getData();
        },
        refresh(isEdit){
            if (isEdit) this.getData();
            else {
                this.pageCfg.PageIndex = 1;
                this.getData();
            }
        }
    },
    mixins: [mixin],
    components: {
        ctForm,
        formItem,
        page{{#operation.export}},
        exportBtn{{/operation.export}}{{#operation.search}},
        search{{/operation.search}}
    }
};
</script>
<style>
@import '~common.css';
</style>

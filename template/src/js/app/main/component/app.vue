<template>
    <div class="container-fluid">{{#operation.search}}
        <ct-form  searchForm :loading="loading" @search="search">
            {{#each_search searchInfo}}
            {{#if_is @type 'select'}}<form-item v-model="searchInfo.{{@field}}" type="{{@type}}" label="{{@label}}" :list="typeList" defaultSelect></form-item>{{else if_is @type 'autoComplete'}}<form-item v-model="searchInfo.{{@field}}" type="{{@type}}" label="{{@label}}" :list="typeList" :matchKeys="['key','val']" :keys="['key','val']" :showKeys="['key','val']"></form-item>{{else}}<form-item v-model="searchInfo.{{@field}}" type="{{@type}}" label="{{@label}}"></form-item>{{/if_is}}
            {{/each_search}}
        </ct-form>{{/operation.search}}{{if_or operation.export operation.add}}
        <div class="clearfix mb10">{{#operation.export}}
            <export-btn :searchInfo="searchInfo" :url="exportUrl"></export-btn>{{/operation.export}}{{#operation.add}}
            <button @click="add" type="button" class="btn btn-sm btn-primary pull-right"><span class="glyphicon glyphicon-plus"></span>添加</button>{{/operation.add}}
        </div>{{/if_or}}
        <adc-table  :data="list" v-loading="loading" :status="status"  :msg="message">
            {{#each_column tableInfo}}
            {{#if_is @type 'date'}}<adc-column prop="{{@field}}" filter="dateTimeFormat" name="{{@label}}"></adc-column>{{else if_is @type 'select'}}<adc-column prop="{{@field}}" :mapper="stateFormat" name="{{@label}}"></adc-column>{{else}}<adc-column prop="{{@field}}" name="{{@label}}"></adc-column>{{/if_is}}
            {{/each_column}} 
            {{#if_or operation.view operation.edit}}
            <adc-column name="操作">{{#operation.view}}
                <button  type="button" class="btn btn-xs btn-primary"  @click="view">
                    <i class="glyphicon glyphicon-edit"></i> 查看
                </button>{{/operation.view}}{{#operation.edit}}
                <button  type="button" class="btn btn-xs btn-primary"  @click="edit">
                    <i class="glyphicon glyphicon-edit"></i> 编辑
                </button>{{/operation.edit}}
            </adc-column>
            {{/if_or}}
        </adc-table>
        <page form :curr-page="searchInfo.PageIndex" :page-len="searchInfo.PageSize" :total-num="count" @change-page="changePage"></page>
        <router-view @refresh="refresh"></router-view>
    </div>
</template>

<script>{{#operation.export}}
import exportBtn from 'component/exportBtn';{{/operation.export}}
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
            searchInfo: {
                PageIndex: 1,
                PageSize: 15
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
        }{{/operation.add}}{{#operation.view}},
        view(){
            this.$router.push({path: '/app/view', query: {id: this.item.Id}});
        }{{/operation.view}}{{#operation.edit}},
        edit(){
            this.$router.push({path: '/app/edit', query: {id: this.item.Id}});
        }{{/operation.edit}}
    },
    mixins: [mixin],
    components: {
        ctForm,
        formItem,
        page,
        exportBtn
    }
};
</script>
<style>
@import '~common.css';
</style>

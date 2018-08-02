<template>
    <div>
        <button  type="button" class="btn btn-xs btn-primary"  @click="view">
            <i class="glyphicon glyphicon-edit"></i> 查看
        </button>
        <button  type="button" class="btn btn-xs btn-primary"  @click="edit">
            <i class="glyphicon glyphicon-edit"></i> 编辑
        </button>
        <slideout  width="50%" title="查看" v-model="show" >
            <template slot="body">
                <form v-if="!error" v-loading="loading" class="form-horizontal">
                    <form-item isStatic label="ID:" :value="info.Id"></form-item>
                    <form-item isStatic label="名称:" :value="info.Name"></form-item>
                    <form-item isStatic label="类型" :value="info.Type"></form-item>
                    <form-item isStatic label="备注:" :value="info.Remark"></form-item>
                </form>
                <div v-if="error" class="error">{{error}}</div>
            </template>
        </slideout>
    </div>
</template>
<script>
import formItem from 'component/formItem';
import slideout from 'ct-adc-slideout';
import mixin from 'common/loadMixin';
import Interface from 'common/interface';
export default {
    mixins: [mixin],
    data() {
        return {
            info: {},
            show: false
        };
    },
    props: {
        item: {
            type: Object,
            default(){
                return {};
            }
        }
    },
    methods: {
        view(){
            this.show = true;
            this.getInfo({
                url: Interface.statistics.detail,
                data: {
                    Id: this.item.Id
                }
            }).then((res)=>{
                this.info = res.Data;
            });
        },
        edit(){
            this.$router.push({path: '/app/edit', query: {id: this.item.Id}});
        }
    },
    components: {
        formItem,
        slideout
    }
};
</script>

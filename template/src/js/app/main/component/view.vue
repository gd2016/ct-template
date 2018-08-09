<template>
    <div>
        <slideout  width="50%" title="查看" v-model="show" @on-after-hide="back">
            <template slot="body">
                <form v-if="!error" v-loading="loading" class="form-horizontal">
                    {{#each_view viewInfo}}
                    <form-item isStatic label="{{@label}}:" :value="info.{{@field}}"></form-item>
                    {{/each_view}}
                </form>
                <div v-if="error" class="error">\{{error}}</div>
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
    created() {
        this.getData(); 
    },
    mounted() {
        this.show = true;
    },
    methods: { 
        getData(){
            this.show = true;
            this.getInfo({
                url: Interface.statistics.detail,
                data: {
                    Id: this.$route.query.id
                }
            }).then((res)=>{
                this.info = res.Data;
            });
        },
        back(){
            this.$router.push({path: '/app'});
        }
    },
    components: {
        formItem,
        slideout
    }
};
</script>

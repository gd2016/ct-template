<template>
    <button type="button" class="btn btn-sm btn-primary pull-right ml10" @click="exportCsv" :disabled="loading">
        <i class="glyphicon" :class="{'glyphicon-refresh':loading, rotate:loading, 'glyphicon-export':!loading}"></i> 导出
        <iframe :src="iframeSrc" style="display:none;"></iframe>
    </button>
</template>

<script>
import axios from 'common/axios';
export default {
    props: {
        formData: {
            type: Object,
            default: ()=>{
                return {};
            }
        },
        url: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            iframeSrc: '',
            minimsg: '',
            loading: false
        };
    },
    methods: {
        exportCsv(){
            this.loading = true;
            axios({
                url: this.url,
                data: this.searchInfo,
                method: 'post'
            }).then((res)=>{
                if (res.Code === 0){
                    this.iframeSrc = res.Data;
                } else {
                    this.minimsg = this.$minimsg({
                        type: 'error',
                        content: res.Message
                    });
                }
                this.loading = false;
            }).catch((error)=>{
                this.minimsg = this.$minimsg({
                    type: 'error',
                    content: error.message
                });
                this.loading = false;
            });
        }
    }
};
</script>

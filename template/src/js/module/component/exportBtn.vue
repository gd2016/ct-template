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
        searchInfo: Object,
        url: String,
        ajax: Boolean
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
            if (this.ajax) this.byAjax();
            else this.common();
        },
        byAjax(){
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
        },
        common(){
            this.iframeSrc = `${this.url}?${this.getUrlString()}`;
        },
        getUrlString() {
            const urlData = Object.assign({}, this.searchInfo, {_: +new Date()});

            return this.urlStringify(urlData);
        },
        urlStringify(data) {
            var arr = [];

            for (const key in data) {
                arr.push(key + '=' + data[key]);
            }
            return arr.join('&');
        }
    }
};
</script>

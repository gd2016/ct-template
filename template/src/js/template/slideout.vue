<template>
    <div>   
        <slideout width="60%" :title="title" v-model="show" @on-after-hide="back">
            <template slot="body">
                
            </template>
        </slideout>
    </div>
</template>

<script>
import slideout from 'ct-adc-slideout';
import mixin from 'common/loadMixin';
export default {
    mixins: [mixin],
    data() {
        return {
            title: '标题',
            show: false
        };
    },
    mounted() {
        this.show = true;
    },
    methods: {
        back(){
            this.$router.push({path: '/app'});
        }
    },
    components: {
        slideout
    }
};
</script>

import axios from 'common/axios';
export default {
    data(){
        return {
            loading: false,         //页面加载状态
            status: true,           //表格列表加载状态
            message: '',            //表格列表加载出错的信息
            minimsg: '',            //弱提示
            error: '',              //错误信息
            list: [],               //表格列表
            count: 0                //分页总记录数
        };
    },
    methods: {
        loadSuccess(){
            this.loading = false;
            this.status = true;
        },
        handleFail(msg){
            this.loading = false;
            this.status = false;
            this.message = msg.message;
        },
        saveSuccess(){
            this.loading = false;
            this.minimsg = this.$minimsg({
                type: 'success',
                content: '保存成功'
            });
        },
        getList({method = 'get', url, data}){ //获取表格列表 
            this.loading = true;
            this.count = 0;
            return new Promise((resolve) => {
                axios({
                    method: method,
                    url: url,
                    params: method === 'get' ? data : '',
                    data: data
                }).then((res)=>{
                    this.message = '';
                    this.loadSuccess();
                    this.list = res.Data.List;
                    this.count = res.Data.RecordCount;
                    resolve(res);
                }).catch((error)=>{
                    this.handleFail(error);
                });
            });
        },
        getInfo({method = 'get', url, data}){  //获取信息
            this.loading = true;
            this.error = '';
            return new Promise((resolve, reject) => {
                axios({
                    method: method,
                    url: url,
                    params: method === 'get' ? data : '',
                    data: data
                }).then((res)=>{
                    this.error = '';
                    this.loading = false;
                    resolve(res);
                }).catch((error)=>{
                    this.loading = false;
                    this.error = error.message;
                    this.minimsg = this.$minimsg({
                        type: 'error',
                        content: error.message
                    });
                    reject(error);
                });
            });
        },
        post({method = 'post', url, data}){   //用户提交操作
            this.loading = true;
            return new Promise((resolve, reject) => {
                axios({
                    method: method,
                    url: url,
                    params: method === 'get' ? data : '',
                    data: data
                }).then((res)=>{
                    this.saveSuccess();
                    resolve(res);
                }).catch((error)=>{
                    this.minimsg = this.$minimsg({
                        type: 'error',
                        content: error.message
                    });
                    this.loading = false;
                    reject(error);
                });
            });
        },
        ajax({method = 'get', url, data}){   //常规异步请求
            return new Promise((resolve, reject) => {
                axios({
                    method: method,
                    url: url,
                    params: method === 'get' ? data : '',
                    data: data
                }).then((res)=>{
                    resolve(res);
                }).catch((error)=>{
                    this.minimsg = this.$minimsg({
                        type: 'error',
                        content: error.message
                    });
                    reject(error);
                });
            });
        }
    }
};

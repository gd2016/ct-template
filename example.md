```
axios.get('/api/api1').then(()=>{
    // 接口数据处理逻辑正常
}).catch(error=>{
    // 接口处理异常或接口本身异常 都会在此处处理
    this.$minimsg({
        type: 'error',
        content: `${error.message}`
    });
});
```
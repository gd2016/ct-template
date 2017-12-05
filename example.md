### 使用code-msg示例

```
import CodeMsg from 'common/code-msg';
import utility from 'ct-utility';
Promise.resolve($.ajax({
    url: '/api/ConstList1',
    type: 'get'
})).then(res=>{
    res = utility.objTransfer.lowerKey(res);
    if (res.code === 0){
        console.log('数据正常');
    } else {
        // 通过code和可能有的codeList得到对应的msg
        return Promise.reject(CodeMsg.getMsgByCode(res.code, res.data));
    }
}).catch(msg=>{
    // 根据不同的错误状态，得出可显示错误信息
    msg = CodeMsg.resolveMsg(msg, '列表请求失败');
    console.log(msg);
});

Promise.resolve($.ajax({
    url: '/api/ConstList2',
    type: 'get'
})).then(res=>{
    res = utility.objTransfer.lowerKey(res);
    if (res.code === 0){
        console.log('数据正常');
    } else {
        return Promise.reject(CodeMsg.getMsgByCode(res.code, res.data));
    }
}).catch(msg=>{
    msg = CodeMsg.resolveMsg(msg, '保存失败');
    console.log(msg);
});

Promise.resolve($.ajax({
    url: '/api/ConstList1',
    type: 'get'
})).then(res=>{
    res = utility.objTransfer.lowerKey(res);
    if (res.code === 0){
        console.log('数据正常');
    } else {
        return Promise.reject(CodeMsg.getMsgByCode(res.code, res.data, errors=>errors.join('<br/>')));
    }
}).catch(msg=>{
    msg = CodeMsg.resolveMsg(msg, '申请失败');
    console.log(msg);
});
```

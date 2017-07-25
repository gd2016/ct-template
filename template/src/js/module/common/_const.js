/**
 * @author rubyisapm
 */
import utility from 'ct-utility';
import Interface from 'common/interface';
var constConfig = {
    auditStatus: [{
        key: 0,
        val: '不限'
    }, {
        key: 1,
        val: '审核通过'
    }, {
        key: 2,
        val: '审核不通过'
    }],
    portraitType(){
        const that = constConfig;
        let p;

        if (Array.isArray(that.portraitType.data) && that.portraitType.data.length > 0) {
            p = Promise.resolve(that.portraitType.data);
        } else {
            p = Promise.resolve($.ajax({
                url: Interface.common.getPortraitTypeList,
                cache: false
            })).then(res=> {
                res = utility.objTransfer.lowerKey(res);

                if (res.statusCode === 0) {
                    that.portraitType.data = [{
                        key: 0,
                        val: '不限'
                    }];
                    res.data.map(item=> {
                        that.portraitType.data.push({
                            key: item.key,
                            val: item.val
                        });
                    });
                } else {
                    //warning!请给出默认值
                    that.portraitType.data = [];
                }
            }).catch(()=> {
                //warning!请给出默认值
                that.portraitType.data = [];
            });
        }
        return p;
    },
    getData(col, hasDef = true, def = '不限'){
        let data;
        const that = constConfig;

        if (Array.isArray(that[col])) {
            data = JSON.parse(JSON.stringify(that[col]));
        } else if (Array.isArray(that[col].data) && that[col].data.length > 0) {
            data = JSON.parse(JSON.stringify(that[col].data));
        }

        if (!hasDef) {
            data = data.slice(1);
        } else if (def !== '不限') {
            data[0].val = def;
        }
        return data;
    },
    getVal(col, key, def = '不限'){
        const data = constConfig.getData(col);
        const matchedItem = data.filter((item)=> {
            return item.key === key;
        });

        if (matchedItem[0].val === '不限' && (def === '请选择' || def === '全部')) {
            return def;
        }
        return matchedItem[0].val;
    },
    getKey(col, val){
        if (val === '请选择' || val === '全部') {
            val = '不限';
        }
        const data = constConfig.getData(col);
        const matchedItem = data.filter((item)=> {
            return item.val === val;
        });

        return matchedItem[0].key;
    }
};

export default constConfig;

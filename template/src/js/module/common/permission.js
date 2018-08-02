import permission from 'ct-adc-permission';
import Interface from 'common/interface';
export default permission.config({
    reqErrorFree: true,
    config: {
        pageName: {
            pageId: 84010202,
            code: {
                page: 84011802,
                operate: {
                    handle: 84011804
                }
            }
        }
    },
    axios: {
        // url: 'http://yapi.tcy365.org:3000/mock/116/getPermission/api/permission',
        url: Interface.common.getPermission,
        method: 'get',
        transformResponse(res){
            res = JSON.parse(res);
            if (!res.Code){
                return {
                    status: true,
                    msg: '',
                    data: res.Data
                };
            }
            return {
                status: false,
                data: []
            };
        }
    }
});

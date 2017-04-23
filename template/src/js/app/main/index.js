import '../../../css/common';
$.ajax({
    url: '/api/patch/gettestchannelId',
    //url:'/api/api1',
    type: 'get',
//    dataType:'json',
    success: function(res) {
        console.log(res);
    }
});




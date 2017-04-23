import '../../css/common';
$.ajax({
    url: '/api/patch/gettestchannelId',
    //url:'/api/api1',
    type: 'get',
//    dataType:'json',
    success: function(res) {
        console.log(res);
    }
});


    /*module A observer*/
    var e = $({});
    var observer = {
        sub: function(cb) {
            e.on('change-msg', cb);
        },
        pub: function() {
            e.trigger('change-msg');
        }
    };
    /*module B store*/
    var _msg = 'hello world!';
    function setMsg(msg) {
        _msg = msg;
        observer.pub('change-msg');
    }
    function getMsg(msg) {
        return _msg;
    }
    /*module C view*/
    function updateView() {
        var $msg = document.getElementById('msg');
        $msg.innerHTML = _msg;
    }
    observer.sub(updateView);
    function initView() {
        updateView();
    }
    function initEventListener(cb) {
        $button = document.getElementById('button');
        $button.addEventListener('click', cb);
    }
    /*module D 业务*/
    initView();
    initEventListener(function() {
        setMsg('hello you!');
    });



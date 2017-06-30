/**
 * Created by xuzhihui on 2017/6/29.
 */
define(['jquery','form','cookie'],function($){
    $('#login-form').submit(function () {
        $(this).ajaxSubmit({
            url:'/api/login',
            type:'post',
            success: function (data) {
                if(data.code==200){
                    $.cookie('userinfo',JSON.stringify(data.result),{path:"/"});
                    location.href="/";
                    console.log(1);
                }
            }
        });
        //防止自动提交；
        return false;
    })

})
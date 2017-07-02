/**
 * Created by xuzhihui on 2017/7/1.
 */
define(['util','template','jquery','form'],function(obj,template,$){
    var id = obj.id;
    //id值不为undefined时，则代表是编辑讲师
    if(id != undefined){
        $.ajax({
            url:'/api/teacher/edit',
            data:{
                tc_id:id
            },
            success:function(data){
                console.log(data);
                if(data.code == 200) {
                    data.result.title = "讲师编辑";
                    data.result.btntxt = "保 存";
                    var html = template('tpl-teacher-addedit',data.result);
                    $('.teacher').html(html);
                }
            }
        })

    }else {
        //id值为undefined时，代表是添加讲师
        var obj = {};
        obj.title = "讲师添加";
        obj.btntxt = '添 加';
        var html = template('tpl-teacher-addedit',obj);
        $('.teacher').html(html);

    }

    //给保存按钮注册事件，点击时则发送保存请求，事件委托
    $('.teacher').on('click','#btn-save',function(){
        console.log('触发了点击事件');
        var url = null;
        //id存在的话代表编辑讲师，发送请求地址是修改讲师地址
        if(id != undefined){
            url = '/api/teacher/update';
        }else {
            url = '/api/teacher/add';
        }
        $("#teacher-addedit").ajaxSubmit({
            url:url,
            type:'post',
            success:function(data){
                console.log(data);
                if(data.code == 200){
                    location.href = "/teacher/list";
                }
            }
        })
        //阻止button的默认提交事件
        return false;
    })
})
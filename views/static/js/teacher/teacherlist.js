
define(['jquery','template','bootstrap'],function($,template){
    //发送请求获取讲师列表信息
    $.ajax({
        url:'/api/teacher',
        type:'get',
        success:function(data){
            console.log(data);
            var html = template('tpl-teacher-list',data);
            $('#teacherlist').html(html);
        }
    })
    //给注销按钮绑定事件，因为是模板渲染之后才有这个按钮，所以利用事件委托注册事件
    $('#teacherlist').on('click','.btn-onoff',function(){
        //发送注销的ajax请求,先获取需要发送的数据
        var id = $(this).parent().data('id');
        var status = $(this).parent().data('status');
        //记录点击的这个btn，方便ajax请求之后对这个元素进行操作
        var $that = $(this);
        $.ajax({
            url:'/api/teacher/handle',
            data:{
                tc_id:id,
                tc_status:status
            },
            success:function(data){
                if(data.code == 200){
                    if(data.result.tc_status == 0){
                        $that.text('启 用').removeClass('btn-warning').addClass('btn-success');
                        $that.parent().data("status",data.result.tc_status);
                    }else {
                        $that.text('注 销').removeClass('btn-success').addClass('btn-warning');
                        $that.parent().data("status",data.result.tc_status);
                    }
                }
            }
        })
    })

    //给查看按钮绑定事件，点击查看时显示对应讲师信息
    $('#teacherlist').on('click','.check-modal',function(){
        var id = $(this).parent().data('id');
        $.ajax({
            url:'/api/teacher/view',
            data:{
                tc_id:id
            },
            success:function(data){
                console.log(data);
                if(data.code == 200){
                    var html = template('tpl-modal-content',data.result);
                    $('#modal-content').html(html);
                    $('#teacherModal').modal('show');
                }
            }
        })
    })

})
/**
 * Created by xuzhihui on 2017/7/1.
 */

//获取地址栏?之后的内容，结果是以键值对的形式存入的obj数组
define(function(){
    var data = location.search;
    var obj = {};
    //格式为？key=value&key=value&key=value...的格式
    if(data != ''){
        var kvArrs = data.slice(1).split('&');//[key=value,key=value,key=value,...]
        for(var i = 0 ; i < kvArrs.length; i++) {
            var kvArr = kvArrs[i].split('=');//[key,value]
            obj[kvArr[0]] = kvArr[1];
        }
    }
    return obj;
})

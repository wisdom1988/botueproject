
//侧边栏的用户头像及用户名信息，除了登陆页面，其余通用，所以定义在公共js中
define(['jquery','template','cookie'],function($,template){
	if(location.pathname != '/dashboard/login'){
		var userinfo = JSON.parse($.cookie('userinfo'));
		var html = template('tpl-userinfo',userinfo);
		$('#userinfo').html(html);
	}
})
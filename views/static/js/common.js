
define(['jquery','template','nprogress','cookie'],function($,template,NProgress){
	//每个页面打开时就注册进度条事件；
	NProgress.start();
	$(function(){
		NProgress.done();
		$(document).ajaxStart(function(){
			NProgress.start();
		});
		$(document).ajaxStop(function(){
			NProgress.done();
		});
		//侧边栏的用户头像及用户名信息，除了登陆页面，其余通用，所以定义在公共js中
		if(location.pathname != '/dashboard/login'){
			//判断用户访问的页面不是login登陆页面时，先确认缓存中是否有sessionid数据，
			//如果没有则先跳转到登陆页面让客户登陆，之后才能访问其他页面
			if(!$.cookie("PHPSESSID")){
				location.href = '/dashboard/login';
			}
			//如果有缓存sessionid数据，证明已经登陆过，渲染侧边栏头像昵称信息；
			var userinfo = JSON.parse($.cookie('userinfo'));
			var html = template('tpl-userinfo',userinfo);
			$('#userinfo').html(html);
		}

		//头部也是公共区域，所以给其退出按钮注册点击事件
		//即使是登陆页没有点击按钮也不会报错，只是点击事件会注册不成功，所以这里不用判断是否是登陆页
		$('#logout').click(function(){
			//给退出登陆的接口发送ajax请求，后台会将cookie的sessionid数据删除
			$.ajax({
				url:'/api/logout',
				type:'post',
				success:function(data){
					if(data.code == 200){
						location.href = "/dashboard/login";
					}
				}
			})
		})

		//侧边栏导航li根据跳转的页面添加样式
		//根据location.pathname来判断
		$('.navs a').each(function(i,v){
			if($(v).attr('href') == location.pathname){
				$(v).addClass('active');
				//如果时下拉菜单中的a标签有active，就需要将下拉列表设置为展示状态；
				//即使这个元素是大li中的a，因为大ul本来就不是隐藏状态，slideDown()不会起作用，所以不用判断是否是下拉菜单中的a标签；
				$(v).parent().parent().slideDown();
			}
		})


		//侧边栏课程管理有下拉列表注册点击事件
		$('.navs > ul > li > ul').parent().click(function(){
			//点击有下拉列表的li的时候，添加深色类，其余的移除深色类；
			$(this).children('a').toggleClass('active').parent().siblings().children('a').removeClass('active');
			$(this).children('ul').slideToggle();
		})



	})

})
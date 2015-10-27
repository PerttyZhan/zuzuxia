define(["require"],function(require){

	var bannerRun = require('bannerRun'), 	//bannerRun的组件
		searchChange = require('searchChange'),	//bannerSearch的组件
		imageShow = require('imageShow'),			//图片的预加载
		clickList = require('clickList');			//点击事件集合

	var $banner = $('#banner'),
		$banner_search = $('#banner-search'),
		$thumbnail = $('.thumbnail');

	$.each( $('.detailsite,.detailtime').find('a'),function(index,elem){

		$(elem).on('click',function(event){
			var _val = $(this).text();
			event.preventDefault();
			$(this).parents('dd').prev().find('input').val(_val);
		});

	});

	/* 登录后的 */
	$('#dropRole').hover(function(e){
		e.stopPropagation();
		$(this).addClass('active');
	},function(e){
		
		$(this).removeClass('active');
	});

	var banner = new bannerRun( $banner,function(){},$('.btn-pre'),$('.btn-next'));
	searchChange.init($banner_search,'search-fiexd');
	imageShow.init( $thumbnail );


	//对于click 事件做的。用事件代理的方式
	$(document.body).on('click','[data-action]',function(e){

		e.preventDefault();
		e.stopPropagation();

		var $this = $(this),
			actionName = $this.data('action'),
			action = clickList[actionName];

		if( $.isFunction(action) ) action.call(clickList,$this);
	});

	$(document).on('click',function(e){

		$('.detailsite').removeClass('active');
		$('.detailtime').removeClass('active');

	});

	/* 检测当前登录状态 获取当前登录用户的Access Token以及OpenID*/

	if( QC.Login.check() ){

		QC.Login.getMe(function(openId, accessToken){

			console.log( openId );
			console.log( accessToken );
		})
	}
});
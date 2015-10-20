define(["require"],function(require){

	var bannerRun = require('bannerRun'), 	//bannerRun的组件;
		clickList = require('clickList'),			//点击事件集合 
		$thumbnail = $('.thumbnail'),
		imageShow = require('imageShow'),			//图片的预加载
		qqShare = require('qqshare');

	//对于click 事件做的。用事件代理的方式
	$(document.body).on('click','[data-action]',function(e){

		e.preventDefault();
		e.stopPropagation();
		
		var $this = $(this);
		var actionName =$this.data('action'),action = clickList[actionName]

		if( $.isFunction(action) ) action.call(clickList,$this);	
			
	});

	/* 登录后的 */
	$('#dropRole').hover(function(e){
		e.stopPropagation();
		$(this).addClass('active');
	},function(e){
		
		$(this).removeClass('active');
	});

	$thumbnail.hover(function(){

		$(this).find('.mask-icon').animate({
			top:0
		},200);
	},function(){

		$(this).find('.mask-icon').animate({
			top:'-40px'
		},200);
	});
	//qq分享

	qqShare.init($('.qq-login'));
	var banner = new bannerRun( $('#banner'),function(){});
	imageShow.init( $thumbnail );
})
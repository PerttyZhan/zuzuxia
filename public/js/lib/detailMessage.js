define(["require"],function(require){

	var bannerRun = require('bannerRun'),
		mapInit = require('mapInit'),				//bannerRun的组件
		clickList = require('clickList'),			//点击事件集合 
		roomBanner = require('roomBanner'),
		width = $(window).width(),
		height = $('.big-img').find('img:eq(0)').css('width',width+'px').height();	

		$('.big-img').css({'opacity':1,'height':height+'px'}).find('');

	roomBanner.init( $('.big-img'),$('.btn-pre'),$('.btn-next'),$('.small-img') );

	$('#e2').hide();
	$('#e1').show();
	$('.btn-group').show();
	$('.map-title').find('a').hover(function(){
		
		$(this).attr('class','active').siblings().removeClass('active');
		if( $(this).index() == 0 ){

			$('#e2').show();
			$('#e1').hide();
			$('.btn-group').hide();
		}else{
			$('#e2').hide();
			$('#e1').show()
			$('.btn-group').show();
		}

	});

	mapInit.Bmap.init('e1');
	mapInit.tengMap.init('e2');

	//对于click 事件做的。用事件代理的方式
	$(document.body).on('click','[data-action]',function(e){

		e.preventDefault();
		e.stopPropagation();
		
		var $this = $(this),
			actionName = $this.data('action'),
			action = clickList[actionName];

		if( $.isFunction(action) ) action.call(clickList,$this);		
	});

	/* 登录后的 */
	$('#dropRole').hover(function(e){
		e.stopPropagation();
		$(this).addClass('active');
	},function(e){
		
		$(this).removeClass('active');
	});


})
define(["require"],function(require){

	var	mapInit = require('mapInit'),					//bannerRun的组件
		roomBanner = require('roomBanner'),				//房屋图片展示	
		clicks = require('action/detail.action.js');	//点击事件集合 
	
	var index = {
		init:function(){
			this.dataInit();	//数据缓存
			this.contentInit(); //界面改变
			this.cpInit();		//组件初始化
			this.eventInit();	//事件初始化
		},
		dataInit:function(){

			typeof this.data == 'undefined'?this.data = {}:void(0);
			$.extend(this.data,{
				$dr:$('#dropRole'),
				$bi:$('.big-img'),
				$bp:$('.btn-pre'),
				$bn:$('.btn-next'),
				$si:$('.small-img')
			});

			//点击事件里面的数据缓存
			$.extend(clicks.data,{
				$e1:$('#e1'),
				$e2:$('#e2'),
				$bg:$('.btn-group'),
				$ai:$('.apt-id')
			});
		},
		eventInit:function(){

			var $dm = this.data['$dr'];
			/* 登录后的 */
			$dm.hover(function(e){
				e.stopPropagation();
				$(this).addClass('active');
			},function(e){
				$(this).removeClass('active');
			});

			//对于click 事件做的。用事件代理的方式
			$(document.body).on('click','[data-action]',function(e){

				e.preventDefault();
				e.stopPropagation();
				var $this = $(this),
					actionName = $this.data('action'),
					action = clicks[actionName];
				if( $.isFunction(action) ) action.call(clicks,$this);
			});
		},
		cpInit:function(){

			roomBanner.init( this.data['$bi'],this.data['$bp'],this.data['$bn'],this.data['$si'] );
			mapInit.Bmap.init('e1');
			mapInit.tengMap.init('e2');
		},
		contentInit:function(){
			this.data['$bi'].find('img').css('width',$(window).width());
		}
	};

	index.init();
})
define(["require"],function(require){

	var clicks = require('action/center.action.js'),
		qqShare = require('qqshare');	

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
				$th:$('.thumbnail'),
				$qs:$('.qq-login')
			});
		},
		eventInit:function(){

			var $dm = this.data['$dr'],
				$th = this.data['$th']
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

			$th.hover(function(){
				$(this).find('.mask-icon').animate({
						top:0
					},200);
				},function(){

				$(this).find('.mask-icon').animate({
						top:'-40px'
				},200);
			});
		},
		cpInit:function(){
			//qq分享
			qqShare.init(this.data['$qs']);
		},
		contentInit:function(){
		}
	};

	index.init();
})
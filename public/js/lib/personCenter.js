define(["require"],function(require){

	var clicks = require('action/center.action.js');

	var index = {
		init:function(){
			this.dataInit();	//数据缓存
			this.eventInit();	//事件初始化
		},
		dataInit:function(){

			typeof this.data == 'undefined'?this.data = {}:void(0);
			$.extend(this.data,{
				$dr:$('#dropRole'),
                $cb:$('#changeBg')
			});

		},
		eventInit:function(){

			var $dm = this.data['$dr'],
				$cb = this.data['$cb'];

			 //背景的改变
            $cb.on('change',function(){
                $(this).parent().
                        submit();
            });

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
		}
	};

	index.init();
})
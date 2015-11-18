define(["require"],function(require){

	var centers = require('action/center.action.js');


	//对于click 事件做的。用事件代理的方式
	$(document.body).on('click','[data-action]',function(e){

		e.preventDefault();
		e.stopPropagation();
		
		var $this = $(this),
			actionName = $this.data('action'),
			action = centers[actionName];

		if( $.isFunction(action) ) action.call(centers,$this);
	});

	/* 登录后的 */
	$('#dropRole').hover(function(e){
		e.stopPropagation();
		$(this).addClass('active');
	},function(e){
		
		$(this).removeClass('active');
	});
})
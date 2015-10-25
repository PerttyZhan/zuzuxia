define(["require"],function(require){

	var clickList = require('clickList');	//点击事件集合 


	//对于click 事件做的。用事件代理的方式
	$(document.body).on('click','[data-action]',function(e){

		e.preventDefault();
		e.stopPropagation();
		
		var $this = $(this),
			actionName = $this.data('action'),
			action = clickList[actionName];

		if( $.isFunction(action) ) action($this);
	});

	/* 登录后的 */
	$('#dropRole').hover(function(e){
		e.stopPropagation();
		$(this).addClass('active');
	},function(e){
		
		$(this).removeClass('active');
	});
})
define(["require"],function(require){

	var clicks = require('action/apt.manager.js');

	$(document.body).on('click','[data-action]',function(e){

		e.preventDefault();
		e.stopPropagation();

		var $this = $(e.target),
			 actionName = $this.data('action'),
			 action = clicks[actionName];

		
		if( actionName != undefined ){ e.preventDefault() };
		if( $.isFunction( action ) ){ action.call(clicks,$this) };
	});
	$(document).on('click',function(e){

		$('.page-choose').hide().removeClass('fadeInUp animated-login');

	});

})
define(["require"],function(require){

	var clickList = require('ZMB-clickList');

	$(document.body).on('click','[data-action]',function(e){

		var $this = $(e.target),
			 actionName = $this.data('action'),
			 action = clickList[actionName];

		
		if( actionName != undefined ){ e.preventDefault() };
		if( $.isFunction( action ) ){ action($this) };
	});


})
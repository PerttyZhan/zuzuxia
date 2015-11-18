define(["require"],function(require){

	var clicks = require('action/admin.action.js');

	$(document.body).on('click','[data-action]',function(e){

		e.preventDefault();
		e.stopPropagation();
		var $this = $(e.target),
			 actionName = $this.data('action'),
			 action = clicks[actionName];

		if( $.isFunction( action ) ){ action.call(clicks,$this) };
	});
	
});
define(['require'],function(require){

	var phoneClick = require('clickList'),
		 attachFastClick = require('fastclick'),
		 slip = require('Slip'),
		 $head = $('head'),
		$main = $('#main'),
		$foot = $('#foot'),
		wrap = document.getElementById('wrap'),
		$wHeight = $(window).height(),
		$bHeight = $(document.body).outerHeight();

	// console.log( typeof module );
	if( $bHeight < $wHeight ){
		$main.css('margin',( $wHeight - $bHeight )/2 +'px 0px' );
	}

	if( wrap != null ){

		var Slip = slip(wrap, 'x')
			.slider()
			.width('100%')
			.height( $(wrap).find('img:eq(0)').height() );
	}	
	
	// attachFastClick.attach(document.body);
	//对于click 事件做的。用事件代理的方式
	$(document.body).on('click','[data-action]',function(e){

		e.preventDefault();
		e.stopPropagation();

		var $this = $(this),
			actionName = $this.data('action'),
			action = phoneClick[actionName];

		if( $.isFunction(action) ) action.call(phoneClick,$this);
	}); 

});
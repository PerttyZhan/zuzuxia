define(["require","module","exports"],function(require,module,exports){

	var WdatePicker = require('WdatePicker');		//事件控件

	var phoneClick = {
		'open-menu':function(This){

			var $menu = $('#dropMenu');
			$menu.slideToggle();

			if( This.hasClass('active') ){
				This.removeClass('active');
			}else{
				This.addClass('active');
			}
		},
		'open-satrt-modal':function(){
			WdatePicker();
		},
		'show-modal':function(This){
			var oParent = This.parent();
			if( oParent.hasClass('active') ){
				oParent.removeClass('active');
			}else{
				oParent.addClass('active');
			}
		}
	};

	module.exports = phoneClick;
});

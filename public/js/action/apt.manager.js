define(["require","module","exports"],function(require,module,exports){

	var clickList = require('clickList');

	module.exports = $.extend(clickList,{
		'page-turn':function($this){
			var parent = $this.parent(),
				page = parent.find('input[name="page"]').val(),
				all = parent.find('input[name="all"]').val();

			page = page == ''?1:page;
			if( page > all ){
				alert('超过总数,最多只有'+all);
			}else{
				window.location.href = 'aptManager?count='+page;
			}
		},
		'open-page-choose':function($this){

			var $page = $this.find('.page-choose');

			if( $page.hasClass('fadeInUp') ){
				$page.hide().removeClass('fadeInUp animated-login');;
			}else{
				$page.addClass('fadeInUp animated-login').show();
			}
		}
	})
})
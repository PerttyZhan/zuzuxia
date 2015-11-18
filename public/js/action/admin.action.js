define(["require","module","exports"],function(require,module,exports){

		var clickList = require('clickList');
		module.exports = $.extend(clickList,{
			'zmb-login':function($this){

				var user = this.valiNull( $this );

				$.ajax({
					url:'/UsernameIsOnly',
					type:'post',
					data:'data='+encodeURIComponent( JSON.stringify(user) ),
					success:function(msg){
						if( msg == 'yes'){
							$this.parents('form').submit();
						}else{
							return $('#error').text('不存在此用户').show();
						}
					},
					error:function(err){
						console.log(err);
					}
				});
			}
		});
})
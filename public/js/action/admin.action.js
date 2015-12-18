define(["require","module","exports"],function(require,module,exports){

		var clickList = require('clickList');
		module.exports = $.extend(clickList,{
			'zmb-login':function($this){

				var $form = $this.parents('form'),
					$err = $('#error'),
					d = this.valiForm({
						'$pt':$form,
						'$err':$err
					});

				if( typeof d == 'boolean' ){
					return ;
				}
				$.ajax({
					url:'/pc/admin/loginin',
					type:'post',
					data:'data='+encodeURIComponent( JSON.stringify(d) ),
					success:function(msg){
						if( msg.msg == 'yes'){
							location.reload();
						}else{
							return $err.text(msg.val).show();
						}
					},
					error:function(err){
						console.log(err);
					}
				});
			}
		});
})
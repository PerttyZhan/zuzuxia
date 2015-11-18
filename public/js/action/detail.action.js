define(["require","module","exports"],function(require,module,exports){

	var clickList = require('clickList');
	var header = require('action/header.action.js');
	var shadow = require('action/shadow.action.js');

 	module.exports = $.extend(clickList,{
 		'house-collect':function(This){

			var $ai = this.data['$ai'];

			if( !this.isLogin ){
				return this.showModal('no-login','您还未登录');
			}

			$.ajax({
			url:'/collectHouse',
			type:'post',
			data:'_id='+$ai.val(),
			success:function(msg){
				if( msg.err !='' ){
				}else{
					location.reload();
				}
			}
			});
		},
		'house-appoint':function(This){

			var $ai = this.data['$ai'],
				require = This.data('require'),pthis = this;

			if( !this.isLogin ){
				return this.showModal('no-login','您还未登录');
			}
			if( require == '' ){
				return this.showModal('no-perfect','请去个人中心完善信息(电话和姓名)');
			}

			$.ajax({
			url:This.data('url'),
			type:'post',
			data:'_id='+$ai.val(),
			success:function(msg){

					if( msg.err !='' ){
						console.log( msg.err );
					}else{
						console.log( msg.yes );
						return pthis.showModal('no-perfect','预约成功');
					}
				}
			});
		},
		'open-site':function(This){

			var $e1 = this.data['$e1'],
				$e2 = this.data['$e2'],
				$bg = this.data['$bg'];
				
			This.attr('class','active').siblings().removeClass('active');

			if( This.index() == 0 ){
				$e2.show();
				$e1.hide();
				$bg.hide();
			}else{
				$e2.hide();
				$e1.show()
				$bg.show();
			}
		}
	},header,shadow);

})
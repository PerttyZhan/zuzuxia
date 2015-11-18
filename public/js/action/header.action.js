define(["require","module","exports"],function(require,module,exports){

	var WdatePicker = require('WdatePicker');		//事件控件

	var headers = {
		headData:{
			$sd:$('#shawdow')
		},
		'lgoinOut':function(This){
			$.ajax({
				url:'/admin/loginOut',
				type:'get',
				success:function(msg){
					location.reload();
				},
				error:function(err){
					console.log(err);
				}
			});
		},
		'open-login-modal':function(){

			var $sd = this.headData['$sd'];
			$sd.
				show().
				find('.loginFace').
				addClass('active fadeInUp animated-login').
				siblings().
				removeClass('active');
		},
		'open-reg-modal':function(){
			var $sd = this.headData['$sd'];
			$sd.
				show().
				find('.regFace').
				addClass('active fadeInUp animated-login').
				siblings().
				removeClass('active');
		},
		'open-site-modal':function(This){
			This.next().hasClass('active')?This.next().removeClass('active'):This.next().addClass('active');
		},
		'open-satrt-modal':function(){
			WdatePicker();
		},
		'open-time-modal':function(This){
			
			This.next().hasClass('active')?This.next().removeClass('active'):This.next().addClass('active');
		}
	};
	module.exports = headers;
})
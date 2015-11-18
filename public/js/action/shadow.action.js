define(["require","module","exports"],function(require,module,exports){
	var shadows = {
		sdData:{
			$sd:$('#shawdow'),
		},
		'close-modal':function(){

			var $sd = this.sdData['$sd'];
			$sd.
				hide().
				find('input').
				not('input[type="button"]').
				val('');
			$sd.
				find('.error,.errorL').
				hide();
		},
		'sendMessage':function(This){

			var $form = This.parents('form'),
				_val = $form.find('input[name="username"]').val(),
				$error = $form.find('.error'),
				$this = This,
				second = 30;

			if( this.valiType( _val ) == '邮箱' ){

				$form.
					find('input[name="registerBy"]').
					val('邮箱');

				$error.hide();

			}else if( this.valiType( _val ) == '电话' ){

				$form.
					find('input[name="registerBy"]').
					val('电话');
				$error.hide();

			}else{
				return $error.
							text('请输入合法的邮箱或者手机号').
							show();
			}

			$this.html('<strong>'+second+'</strong>s后重新发送').attr('disabled','disabled');

			$this.timer = setInterval(function(){
				second--;
				$this.html('<strong>'+second+'</strong>s后重新发送').attr('disabled','disabled');

				if( second == 0 ){

					clearInterval( $this.timer  );
					$this.timer = null ;

					$this.removeAttr('disabled').html('发送验证码');
				}
			},1000);
			$.ajax({
				url:'/pc/sendMessage',
				type:'post',
				data:'src='+_val,
				success:function(msg){

					$this.prev().val( msg.val );

				},
				error:function(err){

				}

			});
		},
		'reg-submit':function(This){
			var $error = This.parents('form').find('.error'),
				j = this.valiNull(This);
			if( typeof j == 'boolean'){
				return ;
			}
			if( ( j.qr != j.sendqr ) ){
				return $error.text('验证码不正确').show();
			}

			$.ajax({
				url:'/admin/register',
				type:'post',
				data:'data='+encodeURIComponent( JSON.stringify(j) ),
				success:function(msg){
					if( msg.msg == 'yes' ){
						location.reload();
					}else{
						console.log(msg);
						return $error.text(msg.val).show();
					}
				},
				error:function(err){
					console.log( err );
				}
			});
		},
		'open-getPass-modal':function(){
			var $sd = this.sdData['$sd'];
			$sd.
				find('.getPassFace').
				addClass('active fadeInUp animated-login').
				siblings().
				removeClass('active');
		},
		'login':function(This){

			var  val = this.valiNull(This),
				err = This.parents('form').find('.error');
				
			if( typeof val == 'boolean'){
				return ;
			}
			
			$.ajax({
				type:'post',
				url:'/admin/login',
				data:'data='+encodeURIComponent( JSON.stringify(val) ),
				success:function(msg){
					if( msg.err == '' ){
						location.reload();
					}else{
						err.text(msg.err).show();
					}
				},
				error:function(err){
				}
			});
		},
		'forgetPass-submit':function(This){
			var $error = $('#reseterror'),
				user = this.valiNull(This);
			if( typeof user == 'boolean'){
				return ;
			}
			if( user.onepass.length <10 || user.onepass.length >20 ){
				return $error.text('密码长度规定在10到20').show();
			}
			
			if( user.onepass != user.agapass ){
				return $error.text('两次密码不一样').show();
			}

			if( user.qr != user.sendqr ){
				return $error.text('短信验证码不正确').show();
			}

			$.ajax({
				url:'/admin/resetPass',
				type:'post',
				data:'data='+encodeURIComponent( JSON.stringify(user) ),
				success:function(msg){
					if( msg.msg == 'yes' ){
						location.reload();
					}else{
						console.log(msg);
						return $error.text(msg.val).show();
					}
				},
				error:function(err){
					console.log( err );
				}
			});
		}
	};
	module.exports = shadows;
})
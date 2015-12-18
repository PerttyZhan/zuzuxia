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
				$err = $form.find('.error'),
				$this = This,
				vt = this.valiType,
				second = 30;

			if( vt['isEmail'].validate( _val ) ){

				$form.
				find('input[name="registerBy"]').
				val('邮箱');
				$err.hide();

			}else if( vt['isPhone'].validate( _val )){

				$form.
				find('input[name="registerBy"]').
				val('电话');
				$err.hide();

			}else{
				return $err.
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
				url:'/sendMessage',
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
			var $form = This.parents('form'),
				$err = $form.find('.error'),
				d = this.valiForm({
					'$pt':$form,
					'$err':$err
				});

			if( typeof d == 'boolean'){
				return ;
			}
			if( ( d.qr != d.sendqr ) ){
				return $err.text('验证码不正确').show();
			}

			$.ajax({
				url:'/person/register',
				type:'post',
				data:'data='+encodeURIComponent( JSON.stringify(d) ),
				success:function(msg){
					if( msg.msg == 'yes' ){
						location.reload();
					}else{
						return $err.text(msg.val).show();
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

			var $form = This.parents('form'),
				$err = $form.find('.error'),
				d = this.valiForm({
					'$pt':$form,
					'$err':$err
				});

			if( typeof d == 'boolean'){
				return ;
			}
			
			$.ajax({
				type:'post',
				url:'/person/loginin',
				data:'data='+encodeURIComponent( JSON.stringify(d) ),
				success:function(msg){
					if( msg.err == '' ){
						location.reload();
					}else{
						$err.text(msg.err).show();
					}
				},
				error:function(err){
				}
			});
		},
		'forgetPass-submit':function(This){
			var $form = This.parents('form'),
				$err = $form.find('.error'),
				d = this.valiForm({
					'$pt':$form,
					'$err':$err
				});

			if( typeof d == 'boolean'){
				return ;
			}
			if( d.onepass != d.agapass ){
				return $err.text('两次密码不一样').show();
			}
			if( d.qr != d.sendqr ){
				return $err.text('短信验证码不正确').show();
			}
			$.ajax({
				url:'/person/resetPwd',
				type:'post',
				data:'data='+encodeURIComponent( JSON.stringify(d) ),
				success:function(msg){
					if( msg.msg == 'yes' ){
						location.reload();
					}else{
						console.log(msg);
						return $err.text(msg.val).show();
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
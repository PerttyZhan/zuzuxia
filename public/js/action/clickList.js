define(["require","module","exports"],function(require,module,exports){

	var WdatePicker = require('WdatePicker');		//事件控件
	//点击事件的集合

	var clickList = {
		'open-login-modal':function(){

			var $shawdow = $('#shawdow');
			$shawdow.show().find('.loginFace').addClass('active fadeInUp animated-login').siblings().removeClass('active');
		},
		'open-reg-modal':function(){
			var $shawdow = $('#shawdow');
			$shawdow.show().find('.regFace').addClass('active fadeInUp animated-login').siblings().removeClass('active');
		},
		'open-getPass-modal':function(){
			var $shawdow = $('#shawdow');
			$shawdow.find('.getPassFace').addClass('active fadeInUp animated-login').siblings().removeClass('active');
		},
		'close-modal':function(){

			var $shawdow = $('#shawdow');
			$shawdow.hide().find('input').not('input[type="button"]').val('');
			$shawdow.find('.error,.errorL').hide();
		},
		'login':function(){

			var $error = $('#error'),$loginForm = $('#loginForm');
			var user = {
				username : $loginForm.find('input[name="username"]').val(),
				password : $loginForm.find('input[name="pass"]').val()
			};

			if( user.username == '' ){

				return $error.text('账号不能为空').show();
			};
			if( user.password == '' ){
				return $error.text('密码不能为空').show();
			};

			$.ajax({
				type:'post',
				url:'/loginAction',
				data:'username='+user.username+'&password='+user.password,
				success:function(msg){
					if( msg.err == '' ){
						location.reload();
					}else{
						$error.text(msg.err).show();
					}
				},
				error:function(err){
					

				}
			});
		},
		'qq-login':function(){
			QC.Login.showPopup();
		},
		'reg-sendMessage':function(This){

			var $loginu = $('#loginU');
			var _val = $loginu.val();
			var $error = $('#regerror');
			var $this = This;
			var second = 30;

			if( this.valiType( _val ) == '邮箱' ){

				$('#registerForm').find('input[name="registerBy"]').val('邮箱');
				$error.hide();

			}else if( this.valiType( _val ) == '电话' ){

				$('#registerForm').find('input[name="registerBy"]').val('电话');
				$error.hide();

			}else{
				return $error.text('请输入合法的邮箱或者手机号').show();
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
		'reg-submit':function(){
			var $register = $('#registerForm');
			var $error = $('#regerror');
			var register = {
				username:$register.find('input[name="username"]').val(),
				password:$register.find('input[name="password"]').val(),
				registerBy:$register.find('input[name="registerBy"]').val()
			};

			if( register.username == '' || register.password == ''){
				return $error.text('用户名/密码不能空').show();
			}

			// if( $register.find('input[name="qr"]').val() == '' || ( $register.find('input[name="qr"]').val() != $register.find('input[name="sendqr"]').val() ) ){
			// 	return $error.text('验证码不正确').show();
			// }
			if( !$register.find('input[type="checkbox"]').prop('checked')){
				return $error.text('请看协议,看后没意见请打钩').show();
			}

			console.log( register );
			$.ajax({
				url:'/register',
				type:'post',
				data:'username='+register.username+'&password='+register.password+'&registerBy='+register.registerBy,
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
		'forgetPass-submit':function(){
			var $resetPass = $('#resetForm');
			var $error = $('#reseterror');
			var wcode = $resetPass.find('input[name="qr"]').val();
			var scode = $resetPass.find('input[name="sendqr"]').val();


			var user = {
				username:$resetPass.find('input[name="username"]').val(),
				onepass:$resetPass.find('input[name="onepass"]').val(),
				agapass:$resetPass.find('input[name="agapass"]').val()
			};

			if( user.username == ''){
				return $error.text('邮箱/手机号不能空').show();
			}
			if( user.onepass == ''){
				return $error.text('密码不能空').show();
			}
			if( user.agapass == ''){
				return $error.text('确定密码不能空').show();
			}
			if( wcode == '' ){
				return $error.text('短信验证码不能空').show();
			}

			if( user.onepass.length <10 || user.onepass.length >20 ){
				return $error.text('密码长度规定在10到20').show();
			}
			
			if( user.onepass != user.agapass ){
				return $error.text('两次密码不一样').show();
			}

			if( wcode != scode ){
				return $error.text('短信验证码不正确').show();
			}

			$.ajax({
				url:'/resetPass',
				type:'post',
				data:'username='+user.username+'&password='+user.onepass,
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
		'forget-sendMessage':function(This){
			var $loginu = $('#resetForm').find('input[name="username"]');
			var _val = $loginu.val();
			var $error = $('#reseterror');
			$this = This;
			var second = 30;

			if( this.valiType( _val ) == '邮箱' ){

				$error.hide();

			}else if( this.valiType( _val ) == '电话' ){

				$error.hide();

			}else{
				return $error.text('请输入合法的邮箱或者手机号').show();
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
		'lgoinOut':function(){

			$.ajax({
				url:'/loginOut',
				type:'get',
				success:function(msg){

					location.reload();
				},
				error:function(err){
					console.log(err);
				}
			});
		},
		'house-collect':function(This){

			var $mnl = $('#message-no-login'),
				_id = $('.apt-id').val(),
				_url = '',_text = '';
			if( document.getElementById('dropMenu') == null ){

				$mnl.removeClass('fadeOutRight animated-fadeOUt').show().addClass('fadeInUp animated-login');
				return setTimeout(function(){
					$mnl.removeClass('fadeInUp animated-login').addClass('fadeOutRight animated-fadeOUt');

				},1000);
			}

			$this = This;

			console.log( _id );
			$.ajax({
			url:'/collectHouse',
			type:'post',
			data:'_id='+_id,
			success:function(msg){

					if( msg.err !='' ){
						console.log( msg.err );
					}else{
						console.log( msg.yes );

						location.reload();
					}
				}
			});
		},
		'house-appoint':function(This){

			var $mnl = $('#message-no-login'),
				$mnp = $('#message-no-perfect'),
				$mas = $('#message-apt-success')
				_id = $('.apt-id').val(),
				_url = '',_text = '',
				require = This.data('require');

			
			if( document.getElementById('dropMenu') == null ){

				$mnl.removeClass('fadeOutRight animated-fadeOUt').show().addClass('fadeInUp animated-login');
				return setTimeout(function(){
					$mnl.removeClass('fadeInUp animated-login').addClass('fadeOutRight animated-fadeOUt');

				},1000);
			}
			if( require == '' ){
				$mnp.removeClass('fadeOutRight animated-fadeOUt').show().addClass('fadeInUp animated-login');
				return setTimeout(function(){
					$mnp.removeClass('fadeInUp animated-login').addClass('fadeOutRight animated-fadeOUt');

				},1000);
			}
			var $this = This;

			console.log( _id );
			$.ajax({
			url:'/appointHouse',
			type:'post',
			data:'_id='+_id,
			success:function(msg){

					if( msg.err !='' ){
						console.log( msg.err );
					}else{
						console.log( msg.yes );
						$mas.removeClass('fadeOutRight animated-fadeOUt').show().addClass('fadeInUp animated-login');
						return setTimeout(function(){
							$mas.removeClass('fadeInUp animated-login').addClass('fadeOutRight animated-fadeOUt');

						},1000);
						// location.reload();
					}
				}
			});
		},
		'check-message':function(This){

			var $elem = This;
			var _id = $elem.prev().val();

			$.ajax({
				type:'post',
				url:'/reviseMessageStatus',
				data:'_id='+_id,
				success:function(){
					$elem.remove();
				}
			});
		},
		'dele-collect':function(This){
			var _val = This.data('val');

			console.log( _val );
			$.ajax({
				type:'post',
				url:'/deleCollectHouse',
				data:'_id='+_val,
				success:function(msg){
					
					location.reload();
				},
				error:function(){

				}
			});
		},
		'turn-page':function(This){
			$this = This;
			var page = $this.prev().val(),all = $this.prev().prev().val();
			page = page == ''?1:page;
			if( page > all ){
				alert('超过总数,最多只有'+all);
			}else{
				 window.location.href = 'personCenter?count='+page;
			}
		},
		'open-site-modal':function(This){
			
			This.next().hasClass('active')?This.next().removeClass('active'):This.next().addClass('active');
		},
		'open-time-modal':function(This){
			
			This.next().hasClass('active')?This.next().removeClass('active'):This.next().addClass('active');
		},
		'open-satrt-modal':function(){
			WdatePicker();
		},
		'calc-endtime':function(This){

			var $starttime = $('#starttime'),$duringtime = $('#duringtime'),$endtime = This;

			if( $starttime.val()=='' || $duringtime.val() == '' ){return;}

			var times = $starttime.val().split('-');
			var year = parseInt(times[0]),month = parseInt(times[1]),day = times[2];
			var dtime = parseInt( $duringtime.val() );

			month = month + dtime;

			if( month > 12 ){
				year+= parseInt( month/12 );
				month = ( month%12 );
			}

			if( month < 10 ){
				month = '0'+month;
			}
			$endtime.val( year + '-' + month + '-' + day );
		},
		'index-apt':function(This){

			var $mnl = $('#message-no-login'),$mnp = $('#message-no-perfect'),require=This.data('require');

			
			if( document.getElementById('dropMenu') == null ){

				$mnl.removeClass('fadeOutRight animated-fadeOUt').show().addClass('fadeInUp animated-login');
				return setTimeout(function(){
					$mnl.removeClass('fadeInUp animated-login').addClass('fadeOutRight animated-fadeOUt');

				},1000);
			}
			if( require == '' ){
				$mnp.removeClass('fadeOutRight animated-fadeOUt').show().addClass('fadeInUp animated-login');
				return setTimeout(function(){
					$mnp.removeClass('fadeInUp animated-login').addClass('fadeOutRight animated-fadeOUt');

				},1000);
			}
			var $form = This.parents('form'),$input = $form.find('input[type="text"]');

			for( var i=0,max=$input.length;i<max;i++ ){
				$input.eq(i).parent().css('border','none');
				if( $input.eq(i).val() == '' ){
					$input.eq(i).parent().css('border','1px solid red');
					return ;
				}
			}

			This.parents('form').submit();
		},
		valiType:function( val ){
			var reg_phone = /^1\d{10}$/;
			var reg_email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
			if( reg_phone.test( val ) ){


				return '电话';

			}else if( reg_email.test( val ) ){


				return '邮箱';

			}else{


				return '其它';

			}
		}

	};
	module.exports = clickList;
})
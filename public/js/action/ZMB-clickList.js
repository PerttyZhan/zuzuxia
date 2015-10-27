define(["require","module","exports"],function(require,module,exports){

	//点击事件的集合

	var clickList = {

		'add-sign':function($this){

			var data = $this.data('name'),
				 $span = $('<span class="can-edit" data-name="'+data+'"><input type="text" class="just-create" name="'+data+'" placeholder="写点什么。。。"/></span>');

			$this.before( $span );
			$span.find('input').focus();
		},
		'alive-input':function($this){
			$this.data('val',$this.val());	
		},
		'dele-img':function($this){

			var $img = $('.pic-show').find('.alive-img'),
				type = $('#changeType').val(),
				_id = $('#_id').val(),
				url = $this.data('url'),
				$input,arr;

			if( $img.length == 0 ){
				return ;
			}
			if( $img.find('img').attr('src') == ''){
				return ;
			}else{

				$img.find('img').attr('src','').next().val('');
				$input = $(".pic-show").find('input[name='+type+']');
				arr = [];

				for( var i=0,max=$input.length;i<max;i++ ){
						arr.push( $input.eq(i).val() );
				}

				$.ajax({
					url:'/'+url,
					type:'post',
					data:'_id='+_id+'&key='+type+'&val='+arr,
					success:function(msg){

						console.log( '删除成功' );
					}
				});
			}
		},
		'update-house-status':function($this){

			var _id = $('#_id').val(),
			    _text = $this.text(),val,$bh = $('input[name="bh"]');

			if( _text == '发布' ){
				val = '2';
			}else if( _text == '下架' ){
				val = '1';
			}else{
				val = '3';
			}

			console.log($bh.data('val'));
			if( $bh.data('val') == '' ){

				$bh.focus();
				return alert('编码不能为空');
			}

			

			$.ajax({
				url:'/changeStatus',
				data:'val='+val+'&_id='+_id,
				type:'post',
				success:function(msg){

					if( val == '3' ){
						window.location.href = '/house';
					}else{
						window.location.reload();
					}
				}
			});
		},
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
				$page.removeClass('fadeInUp animated-login').hide();
			}else{
				$page.addClass('fadeInUp animated-login').show();
			}
		},
		'zmb-login':function($this){

			var username = $('input[name="username"]').val(),
				 pass = $('input[name="password"]').val(),
				 $error = $('#error'),
				 $form = $('#managerForm');

			if( username == '' ){
				return $error.text('账号不能为空').show();
			}else if( pass == '' ){
				return $error.text('密码不能为空').show();
			}
			
			$.ajax({
				url:'/UsernameIsOnly',
				type:'post',
				data:'username='+username,
				success:function(msg){
					if( msg == 'yes'){
						$form.submit();
					}else{

						return $error.text('不存在此用户').show();
					}
				},
				error:function(err){
					console.log(err);
				}
			});
		}
	};
	module.exports = clickList;
})
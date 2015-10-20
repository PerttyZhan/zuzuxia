

$(document).ready(function(){


	//初始高度
	$('#main .content').css('height',$(window).height()-$('#header').height()+'px');


	var clickList = {

		''
	};
	$(document).on('click',function(e){

		var $this = $(e.target);


	});

	$('.add-sign').on('click',function(event){

		event.preventDefault();
		var data = $(this).data('name');
		var html = $('<span class="can-edit" data-name="'+data+'"><input type="text" class="just-create" name="'+data+'" placeholder="写点什么。。。"/></span>');

		$(this).before( html );
		html.find('input').focus();
	});

	$('#main').find('input.alive-input').on('click',function(){
		var key = $(this).attr('name');
		var val = $(this).val();
		$(this).data('val',val);

	});
	$('#main').find('input.alive-input').on('keydown',function(){
		var $this = $(this);
		var val = $this.val();
		var _length = val.length;

		if( _length >= 50 ){
			_length = 50;
		}

		$this.val( val.substr(0,50) );
		$this.next().find('strong').text(_length);

	});

	$('#main').find('input.alive-input').on('change',function(){
		var key = $(this).attr('name');
		var val = $(this).val();
		var data = $(this).data('val');
		var _id = $('#_id').val();

		if( val == '' ){
			 return $(this).val( data );
		}

		if( key == 'tilte' ){
			$('.house-title').text( val );
		}else if( key == 'summary' ){
			$('.house-summary').text( val );
		}

		$.ajax({
			url:'/updateMessage',
			type:'post',
			data:'_id='+_id+'&key='+key+'&val='+val,
			success:function(msg){

			},
			error:function(err){
				console.log( err );
			}
		});
	});
	$('#main').delegate('input.just-create','blur',function(){
		var key = $(this).attr('name');
		var val = $(this).val();
		var _id = $('#_id').val();
		var config_id = $('#config_id').val();
		var arr = [];
		if( val == '' ){
			$(this).parent().remove();
		}else{

			$(this).parent().html( val );
		}
		var keys = $('span[data-name='+key+']');

		for( var i=0,max = keys.length;i<max;i++ ){
			arr.push( $.trim( keys.eq(i).text() ) );
		}

		$.ajax({
			url:'/updateMessage',
			type:'post',
			data:'_id='+_id+'&key='+key+'&val='+arr+'&config_id='+config_id,
			success:function(msg){

			}
		})
	});
	$('#main').delegate('.can-edit','dblclick',function(event){

		var text = $.trim( $(this).text() );
		var data = $(this).data('name');
		var html = $('<span class="can-edit" data-name="'+data+'"><input type="text" class="just-create" name="'+data+'" data-val="'+text+'" placeholder="写点什么。。。" value="'+text+'"/></span>');
	
		$(this).replaceWith( html );
		html.find('input').focus();
	});

	//地图那快

		$('#e2').hide();
		$('#e1').show();
		$('.map-btn').show();
		$('.map-title').find('li').hover(function(){
			
			$(this).attr('class','active').siblings().removeClass('active');
			if( $(this).index() == 0 ){

				$('#e2').show();
				$('#e1').hide();
				$('.map-btn').hide();
			}else{
				$('#e2').hide();
				$('#e1').show()
				$('.map-btn').show();
			}

		});


		$('.pic-show').find('a').on('click',function(event){

			event.preventDefault();

			var name = $(this).data('name');
			$(this).parents('.pic-show').find('a').css('border','1px solid #d6d6d6').removeClass('alive-img');
			$(this).css('border','1px solid #6ed16e').addClass('alive-img');
			$('#changeType').val( name );
		})
		$('input[type="file"]').on('change',function(){

			var file = $(this).val().split('\\');
			var _id = $('#_id').val();
			var $img = $('.pic-show').find('.alive-img');

			if( $img.length ==0 ){
				return console.log('no change');
			}
			$img.css('background','url("/image/load.gif") no-repeat center').find('input').val('1');
			$(this).parents('form').submit();
			var time = setInterval( function(){

				var img = new Image();
				img.src = '/image/'+_id+'/'+file[(file.length -1)];
				
				img.onload = function (){

					$img.css('background','none').find('img').attr('src','/image/'+_id+'/'+file[ file.length -1 ]).addClass('has-img');
					$img.find('input').val('/image/'+_id+'/'+file[ file.length -1 ]);
					clearInterval( time );
					time = null;
				}
				img.error = function(){
					clearInterval( time );
					time = null;
				}

			},500 );
		});

		$('.dele').on('click',function(){

			var $img = $('.pic-show').find('.alive-img');
			var type = $('#changeType').val();

			if( $img.length == 0 ){
				return ;
			}
			var _id = $('#_id').val();
			if( $img.find('img').attr('src') == ''){
				return ;
			}else{
				$img.find('img').attr('src','').next().val('');
				var $input = $(".pic-show").find('input[name='+type+']');
				var arr = [];
				for( var i=0,max=$input.length;i<max;i++ ){
						arr.push( $input.eq(i).val() );
				}

				$.ajax({
					url:'/updateMessage',
					type:'post',
					data:'_id='+_id+'&key='+type+'&val='+arr,
					success:function(msg){

					}
				});
			}
		});
		//所有公寓-hover
		var reg =/^[0-9]*[0-9][0-9]*$/;
		$.each( $('.thumbnail'),function(i,elem){
			if( reg.test( (i-1)/3 ) ){

				$(this).addClass('middle-div');
			}

		} );
		$('.thumbnail').hover(function(e){

			e.stopPropagation();

			$(this).find('.mask-icon').animate({
				opacity:1,
				top:0
			},200);

		},function(e){
			e.stopPropagation();

			$(this).find('.mask-icon').animate({
				opacity:0,
				top:'-40px'
			},200);
		});
		//房屋的删除，发布，下架

		$('#under,#dele,#release').on('click',function(event){

				var _id = $('#_id').val();
				var _text = $(this).text(),val;

				if( _text == '发布' ){
					val = '2';
				}else if( _text == '下架' ){
					val = '1';
				}else{
					val = '3';
				}

				$.ajax({
					url:'/changeStatus',
					data:'val='+val+'&_id='+_id,
					type:'post',
					success:function(msg){

						window.location.reload();
					}
				});
		});

		//后台登录界面

		$('#btn-login').on('click',function(event){
				
				event.preventDefault();

				var username = $('input[name="username"]').val();
				var pass = $('input[name="password"]').val();
				var $error = $('#error');
				var $this = $(this);
				var $form = $('#managerForm');

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

		});

		// 预约管理 -- 跳转
		$('#open-turn').on('click',function(e){

			e.preventDefault();

			var $page = $(this).find('.page-choose');

			console.log( $page.hasClass('fadeInUp') );
			if( $page.hasClass('fadeInUp') ){
				$page.removeClass('fadeInUp animated-login').hide();
			}else{
				$page.addClass('fadeInUp animated-login').show();
			}

		});
		$('#open-turn .page-choose').on('click',function(e){
			e.stopPropagation();
			return false;
		});
		$('#turn-page').on('click',function(e){

			e.preventDefault();

			var parent = $(this).parent(),
				page = parent.find('input[name="page"]').val(),
				all = parent.find('input[name="all"]').val();

			if( page > all ){
				alert('超过总数,最多只有'+all);
			}else{
				window.location.href = 'aptManager?count='+page;
			}

		});

});
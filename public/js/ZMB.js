

function bannerRun(oParent,hoverfn,btnPre,btnNext,btnNum){

	this.$oParent = oParent;

	if( this.$oParent.data('anim') || this.$oParent.data('anim') == 'no' ){ return ; }
	this.$btnPre = btnPre;
	this.$btnNext = btnNext;
	this.$btnNum = btnNum;
	this.defaultSign = 1;
	this.hoverfn = hoverfn;
	this.aLi = this.$oParent.find('li');
	this.length = this.aLi.length;
	this.index = 0;
	this.zIndex = 1;
	this.autoScoll();
	this.addEvent();
}
bannerRun.prototype = {

	constructor:bannerRun,
	version:'1.0.0',
	oLeft:['20px','-20px'],
	autoScoll:function(){

		var This = this;

		this.$oParent.timer = setInterval( $.proxy( This.runPic,This ),4000 );
	},
	runPic:function(target){


		var This = this;
		var aLi = this.aLi;
		var length = this.length;
		var oIndex = this.index;
		var oLeft = this.oLeft[oIndex%2];
		var targetIndex = (typeof target == 'number')? target:(oIndex+1 < length)?oIndex+1:0;

		this.removeEvent();

		aLi.eq( oIndex ).css({
			'z-index':1,
			'margin-left': 0,
			left:0
		}).animate({
			opacity:0
		},1500);

		if( this.numAli ){
			
			this.numAli.removeClass('active').eq(targetIndex).addClass('active');
		}

		aLi.eq( targetIndex ).css({
			'z-index':10,
			left:oLeft,
			'margin-left': 0
		}).animate({
			opacity:1,
			left:0
		},1500,function(){

			if( This.$oParent.timer == null){
				This.$oParent.timer = setInterval( $.proxy( This.runPic,This ),4000 );
			}
			This.addEvent();
		});

		this.index = targetIndex;
	},
	addEvent:function(){

		var This = this;
		if( this.$btnPre != null ){
			this.$btnPre.on('click',$.proxy( This.preEvent,This ) );
		}
		if( this.$btnNext != null ){
			this.$btnNext.on('click',$.proxy( This.nextEvent,This ) );
		}
		if( this.$btnNum ){

			this.numAli = this.$btnNum.find('li');
			this.numAli.on('click',function(event){

				event.preventDefault();
				event.stopPropagation();

				if( This.$oParent.timer ){


					clearInterval( This.$oParent.timer );
					This.$oParent.timer = null;
				}
				var targetIndex = $(this).index();
				This.runPic.call(This,targetIndex);
			});
		}
	},
	removeEvent:function(){

		var This = this;
		if( this.$btnPre != null ){
			this.$btnPre.off('click');
		}
		if( this.$btnNext != null ){
			this.$btnNext.off('click' );
		}
		if( this.$btnNum ){
			this.numAli.off('click');
		}

	},
	preEvent:function(){

		var This = this;

		if( this.$oParent.timer ){


			clearInterval( this.$oParent.timer );
			this.$oParent.timer = null;
		}

		var oIndex = this.index;
		var targetIndex = (oIndex - 1 < 0 )?(this.aLi.length-1):(oIndex - 1);

		this.runPic.call(This,targetIndex);
	},
	nextEvent:function(){
		var This = this;

		if( this.$oParent.timer ){
			clearInterval( this.$oParent.timer );
			this.$oParent.timer = null;
		}

		var oIndex = this.index;
		var targetIndex = (oIndex + 1 < this.aLi.length )?(oIndex + 1):(this.aLi.length - 1);

		this.runPic.call(This,targetIndex);
	},
	numToPic:function(){
		
	}
};


$(document).ready(function(){

	//初始高度
	$('#main .content').css('height',$(window).height()-$('#header').height()+'px');
	$.each( $('.scoll-pic'),function(index,elem){

		new bannerRun($(elem) ,function(){},null,null,$('.sroll-num'));
	} );

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

		$('#e2').show();
		$('#e1').hide();
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

});
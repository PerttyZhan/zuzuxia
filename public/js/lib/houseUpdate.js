define(["require"],function(require){

	var clickList = require('ZMB-clickList'),
		mapInit = require('mapInit'),
		$main = $('#main');

	$(document.body).on('click','[data-action]',function(e){

		var $this = $(e.target),
			 actionName = $this.data('action'),
			 action = clickList[actionName];

		if( actionName != undefined ){ e.preventDefault() };
		if( $.isFunction( action ) ){ action($this) };
	});


	$('.pic-show').find('a').on('click',function(event){

		var name = $(this).data('name');
		$(this).parents('.pic-show').find('a').css('border','1px solid #d6d6d6').removeClass('alive-img');
		$(this).css('border','1px solid #6ed16e').addClass('alive-img');
		$('#changeType').val( name );
	});

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

	mapInit.Bmap.init('e1');
	mapInit.tengMap.init('e2');

	$main.find('input.alive-input').on('keydown',function(){
		var $this = $(this),
			 val = $this.val(),
			 _length = val.length;

		if( _length >= 50 ){
			_length = 50;
		}

		$this.val( val.substr(0,50) );
		$this.next().find('strong').text(_length);

	});

	$main.find('input.alive-input').on('change',function(){
		var  $this = $(this),
			key = $this.attr('name'),
			 val = $this.val(),
			 data = $this.data('val'),
			 _id = $('#_id').val();
			

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
				$this.data('val',val)
			},
			error:function(err){
				console.log( err );
			}
		});
	});
	$main.delegate('input.just-create','blur',function(){
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
	$main.delegate('.can-edit','dblclick',function(event){

		var text = $.trim( $(this).text() );
		var data = $(this).data('name');
		var html = $('<span class="can-edit" data-name="'+data+'"><input type="text" class="just-create" name="'+data+'" data-val="'+text+'" placeholder="写点什么。。。" value="'+text+'"/></span>');
	
		$(this).replaceWith( html );
		html.find('input').focus();
	});

	$('input[type="file"]').on('change',function(){

		var file = $(this).val().split('\\');
		var _id = $('#_id').val();
		var $img = $('.pic-show').find('.alive-img');

		if( $img.length ==0 ){
			alert('需要先选中对象');
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

})
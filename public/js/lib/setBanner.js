define(['require'],function(require){

	var clickList = require('ZMB-clickList');

	$(document.body).on('click','[data-action]',function(e){

		var $this = $(e.target),
			 actionName = $this.data('action'),
			 action = clickList[actionName];

		if( actionName != undefined ){ e.preventDefault() };
		if( $.isFunction( action ) ){ action($this) };
	});

	$('.banner-img').on('click',function(event){
		var name = $(this).data('name');
		$(this).addClass('alive-img').siblings().removeClass('alive-img');
	});

	$('input[type="file"]').on('change',function(){

		var file = $(this).val().split('\\');
		var _id = $('#_id').val();
		var $img = $('.alive-img');

		if( $img.length ==0 ){
			alert('需要先选中对象');
		}
		$img.css('background','url("/image/load.gif") no-repeat center').find('input').val('undefined');
		$(this).parents('form').submit();

		var time = setInterval( function(){

			var img = new Image();
			img.src = '/image/banner/'+file[(file.length -1)];
			
			img.onload = function (){

				$img.css('background','none').find('img').attr('src','/image/banner/'+file[ file.length -1 ]).addClass('has-img');
				$img.find('input').val('/image/banner/'+file[ file.length -1 ]);
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
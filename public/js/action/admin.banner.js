define(["require","module","exports"],function(require,module,exports){

	var clickList = require('clickList');

	module.exports = $.extend(clickList,{
		'dele-img':function($this){

			var $img = $('.pic-show').find('.alive-img'),
				type = $('#changeType').val(),
				_id = $('#_id').val(),
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
					url:'/updatePageSet',
					type:'post',
					data:'_id='+_id+'&key='+type+'&val='+arr,
					success:function(msg){

						console.log( '删除成功' );
					}
				});
			}
		}
	});
})
define(["require","module","exports"],function(require,module,exports){

	var clickList = require('clickList');

	module.exports = $.extend(clickList,{
		'add-sign':function($this){

			var data = $this.data('name'),
				 $span = $('<span class="can-edit" data-name="'+data+'"><input type="text" class="just-create" name="'+data+'" placeholder="写点什么。。。"/></span>');

			$this.before( $span );
			$span.find('input').focus();
		},
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

			if( $bh.data('val') == '' && _text == '发布' ){

				$bh.focus();
				return alert('编码不能为空');
			}

			

			$.ajax({
				url:'/changeStatus',
				data:'val='+val+'&_id='+_id,
				type:'post',
				success:function(msg){

					if( val == '3' ){
						window.location.href = '/pc/house';
					}else{
						window.location.reload();
					}
				}
			});
		},
	});
})
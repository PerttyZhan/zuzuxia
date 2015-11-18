define(["require","module","exports"],function(require,module,exports){
		var clickList = require('clickList');

		module.exports = $.extend(clickList,{
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
		});
})
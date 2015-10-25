define(["require","module","exports"],function(require,module,exports){

	//首页预定栏的效果
	var searchChange = {

		init:function(oParent,overClass){
			this.$oParent = oParent;
			this.oTop = $('#banner').find('a').height();
			this._class = overClass;
			this.addEvent();
		},
		addEvent:function(){
			var This = this;
			$(document).on('scroll',$.proxy(This.scollEvent,This) );
		},
		scollEvent:function(event){
			if( $(document).scrollTop() > parseInt( this.oTop )+50 ){
				this.$oParent.addClass( this._class );
			}else{
				this.$oParent.removeClass( this._class );
			}
		}
	};

	module.exports = searchChange;
})
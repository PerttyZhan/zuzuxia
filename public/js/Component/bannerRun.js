
define(['require','module','exports'],function(require,module,exports){


	var _config = {
		defaultSign:false,
		index:0
	};

	function bannerRun(oParent,btnPre,btnNext){

		this.$oParent = oParent;
		this.$btnPre = btnPre;
		this.$btnNext = btnNext;
		this.aLi = this.$oParent.find('li');
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
			var This = this,
				aLi = this.aLi,
				 length = aLi.length,
				 oIndex = this.index,
				 oLeft = this.oLeft[oIndex%2],
				 targetIndex = (typeof target == 'number')? target:(oIndex+1 < length)?oIndex+1:0;
			This.defaultSign = true;

			if( This.$oParent.timer == null){
				This.$oParent.timer = setInterval( $.proxy( This.runPic,This ),4000 );
			}
			aLi.eq( oIndex ).css({
				'z-index':1,
				'margin-left': 0,
				left:0
			}).animate({
				opacity:0
			},1500);

			aLi.eq( targetIndex ).css({
				'z-index':10,
				left:oLeft,
				'margin-left': 0
			}).animate({
				opacity:1,
				left:0
			},1500,function(){
				setTimeout(function(){
					This.defaultSign = false;
				},1000)
			});
			this.index = targetIndex;
		},
		addEvent:function(){

			var This = this;
			this.$btnPre.on('click',$.proxy( This.btnEvent,This ) );
			this.$btnNext.on('click',$.proxy( This.btnEvent,This ) );
		},
		btnEvent:function(e){

			var This = this,
				oIndex = this.index,
				targetIndex,
				length = this.aLi.length;

			if( This.defaultSign ){
				return ;
			}
			if( e.target == This.$btnNext.get(0)  ){
				targetIndex = (oIndex + 1 < length )?(oIndex + 1):0;
			}else{
				targetIndex = (oIndex - 1 < 0 )?(length-1):(oIndex - 1);
			}
			if( this.$oParent.timer ){
				clearInterval( this.$oParent.timer );
				this.$oParent.timer = null;
			}
			this.runPic.call(This,targetIndex);
		}
	};

	module.exports = $.extend(bannerRun,_config);
})
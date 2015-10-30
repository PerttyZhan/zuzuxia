
define(['require','module','exports'],function(require,module,exports){

	function bannerRun(oParent,btnPre,btnNext){

		oParent.css('opacity',1).find('ul').height( oParent.find('a').height() ).find('li:eq(0)').addClass('active');


			var bannerTimer = setInterval(function(){
			if( oParent.height() ){

				$(document.body).css('padding-top',oParent.height() - 1 +'px').show();
				clearInterval( bannerTimer );
				bannerTimer = null;
				}

			},20);
		
		this.$oParent = oParent;
		this.$btnPre = btnPre;
		this.$btnNext = btnNext;
		this.defaultSign = 1;
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
			this.$oParent.find('li:eq(0)').addClass('active');
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
		},
		removeEvent:function(){

			var This = this;
			if( this.$btnPre != null ){
				this.$btnPre.off('click');
			}
			if( this.$btnNext != null ){
				this.$btnNext.off('click' );
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
			var targetIndex = (oIndex + 1 < this.aLi.length )?(oIndex + 1):0;

			this.runPic.call(This,targetIndex);
		}
	};

	module.exports = bannerRun;
})
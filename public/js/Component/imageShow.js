
define(['require','module','exports'],function(require,module,exports){



	//图片的按需加载
	var imageShow = {
		init:function($img){

			var $oAi = $img,reg =/^[0-9]*[0-9][0-9]*$/;

			var arr = [];
			for( var i=0,max=$oAi.length;i<max;i++){

				if( reg.test( (i-1)/3 ) ){

					$oAi.eq(i).addClass('middle-div');
				}
				var config = this.getSubClient( $oAi.eq(i) );

				arr.push({
					obj:$oAi.eq(i),
					json:config,
					img:$oAi.eq(i).find('img:eq(0)')
				});
			}
			this.arr = arr;

			
			this.initImage();
			this.initEvent();

		},
		initImage:function(){

		},
		initEvent:function(){

			var This = this;
			$(window).scroll( $.proxy(function(){

				var _arr = this.arr,_src,s_arr=[];

				if( _arr.length == 0 ){
					$ (window).unbind('scroll');
					return ;
				}
				var win_json = this.getClient(),obj_json={};

				for( var i=0,max=_arr.length;i<max;i++){

					obj_json = this.getSubClient( _arr[i].obj );
					
					if( this.intens( win_json,obj_json ) ){

						_src = _arr[i].img.data('src');
						_arr[i].img.attr('src',_src);
						_arr[i].obj.css({
							'-webkit-animation': 'slide .8s ease 0s both',
	  						'animation': 'slide .8s ease 0s both'
						}).fadeIn(800);
					}else{
						s_arr.push( _arr[i] )
					}

				}
				 
				this.arr = s_arr;
			},This) );
		},
		getClient:function(){
			//返回浏览器的可视区域位置

			var l,t,w,h;

			l = $(window).scrollLeft();
			t = $(window).scrollTop();
			w = $(window).width();
			h = $(window).height();

			return {left:l,top:t,width:w,height:h};
		},
		getSubClient:function($p){
			// 返回待加载资源位置

			var l=0,t=0,w,h;

			l = $p.offset().left;
			t = $p.offset().top;
			w = $p.width();
			h = $p.height();

			return {left:l,top:t,width:w,height:h}
		},
		intens:function(rec1,rec2){
			// 判断两个矩形是否相交,返回一个布尔值 

			var lc1,lc2,tc1,tc2,w1,h1;

			lc1 = rec1.left + rec1.width/2;
			lc2 = rec2.left + rec2.width/2;
			tc1 = rec1.top + rec1.height/2;
			tc2 = rec2.top + rec2.height/2;
			w1 = ( rec1.width + rec2.width )/2;
			h1 = ( rec1.height + rec2.height )/2;

			return Math.abs(lc1 - lc2) < w1 && Math.abs(tc1 - tc2) < h1;

		}
	};

	module.exports = imageShow;
})
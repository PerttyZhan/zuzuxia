define(["require","module","exports"],function(require,module,exports){

	//详情页的banner
	var roomBanner = {

		init:function( $ul,$pre,$next,$thumbnail ){

			this.$ul = $ul;
			this.length = $ul.find('li').length;
			this.$pre = $pre;
			this.$next = $next;
			this.$thumbnail = $thumbnail;
			this.index = 0;
			this.maxX = [];
			this.maxY = [];
			this.addEvent();
		},
		addEvent:function(){

			var $pre = this.$pre,
				$next = this.$next,
				length = this.length,
				$thumbnail = this.$thumbnail,
				$ul = this.$ul,
				This = this,
				width = $(window).width(),
				height = $ul.height(),
				x,y,x1,y1,posx,posy,disx,disy,rate,scaleX,scaleY,scale;

			$pre.on('click',$.proxy( This.clickEvent,This ));

			$next.on('click',$.proxy( This.clickEvent,This ));

			$thumbnail.on('click','span',$.proxy( This.clickEvent,This ));


			$ul.on('mousewheel | DOMMouseScroll',function(e){

				e.stopPropagation();
				e.preventDefault();
				var arr_maxx = This.maxX,
					arr_maxy = This.maxY,
					oindex= This.index,
					maxX = arr_maxx[oindex] || 0,
					maxY = arr_maxy[oindex]  || 0;

				//鼠标滚轮的滚动方向 >0 up;<0 down
               var _delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail),
               		$li = $ul.find('li:eq('+oindex+')'),
               		_size = $li.css('-webkit-transform').match(/((\d)+(\.)?(\d)*)/g),
               		posx = parseFloat( $li.css('left') ).toFixed(2),
               		posy = parseFloat( $li.css('top') ).toFixed(2),
               		scale = _size[0] * 100;

					if (_delta > 0) {

	                     rate = scale + 5;
	                     $li.css('-webkit-transform-origin',e.clientX*100/rate + 'px '+e.clientY*100/rate + 'px');  
	                 } else {
	                 	if( scale == 100 ){
	                 		rate = 100;
	                 		return ;
	                 	}else{
	                 		rate = scale - 5;
	                 	}
	                 }
	                 $li.css('-webkit-transform','scale('+ parseFloat( rate/100 ).toFixed(2) +')' );

	                 maxX = width * ( rate -100)/200;
	                 maxY = height * ( rate -100)/200;
	                 arr_maxx[oindex] = maxX;
	                 arr_maxy[oindex] = maxY;

	                 if( Math.abs( posx ) >= maxX){
	                 	posx = -maxX
	                 }
	                 if( Math.abs( posy ) >= maxY){
	                 	posy = -maxY
	                 }

                	$li.css({'left':posx +'px ',top:posy +'px '});
			});

			$ul.mousedown(function(e){

				e.preventDefault();
				x = e.clientX,
				y = e.clientY,
				maxX = This.maxX[This.index] || 0,
				maxY = This.maxY[This.index] || 0;

				_move=true;
				$(document).mousemove(function(e){

					e.preventDefault();
					if( _move ){

						var $li = $ul.find('li:eq('+This.index+')');
						x1 = e.clientX,
						y1 = e.clientY,

						posx = parseInt( $li.css('left') ),
						posy = parseInt( $li.css('top') ),


						disx = ( posx + x1 -x ),
						disy = ( posy + y1 -y );

						if( disx >= 0 ){
							disx = 0;
						}else if( Math.abs(disx) >= maxX ){
							disx = -maxX ;
						}
						if( disy >= 0 ){
							disy = 0;
						}else if( Math.abs(disy) >= maxY ){
							disy = -maxY;
						}

						$li.css({'left':disx +'px ',top:disy +'px '});
						x = x1;
						y = y1;
					}
					
				}).mouseup(function(){
					_move=false;
				});

			});
		},
		clickEvent:function(e){
			var index = this.index,
				length = this.length,
				$pre = this.$pre,
				$next = this.$next,
				target = e.target;

			if( target == $pre.get(0) ){
				index = index == 0 ? (length -1) : (index-1);
			}
			else if( target == $next.get(0) ){
				index = ( index == (length-1) ) ? 0 : (index+1);
			}else{
				
				index = $(target).parent().index();
			}
			this.show.call(this,index);
		},
		show:function(index){

			var $ul = this.$ul,
				$thumbnail = this.$thumbnail;
			$ul.find('li').eq(index).show().siblings().hide();
				$thumbnail.find('span').removeClass('active').eq(index).addClass('active');
				this.index = index;
		}

	};

	module.exports = roomBanner;
	
});
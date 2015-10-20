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
				x,y,x1,y1,posx,posy,disx,disy,rate,maxX = 0,maxY = 0;

			$pre.on('click',function(){

				var index = This.index == 0 ? (length -1) : (This.index-1),
					offsetLeft = width * index;
				$ul.css('left','-'+offsetLeft + 'px');
				$thumbnail.find('span').removeClass('active').eq(index).addClass('active');

				This.index = index;

			});

			$next.on('click',function(){

				var index = ( This.index == (length-1) ) ? 0 : (This.index+1),
					offsetLeft = width * index;
				$ul.css('left','-'+offsetLeft + 'px');
				$thumbnail.find('span').removeClass('active').eq(index).addClass('active');

				This.index = index;
			});

			$thumbnail.on('click','span',function(){

				var index = $(this).index(),
					offsetLeft = width * index;
				$ul.css('left','-'+offsetLeft + 'px');
				$thumbnail.find('span').removeClass('active').eq(index).addClass('active');

				This.index = index;
			});


			$ul.on('mousewheel | DOMMouseScroll',function(e){

				e.stopPropagation();
				e.preventDefault();

				//鼠标滚轮的滚动方向 >0 up;<0 down
               var _delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail),
               		$a = $ul.find('li:eq('+This.index+')').find('a'),
               		_size = parseInt( $a.css('background-size') ),
               		posx = parseInt( $a.css('background-position-x') ),
					posy = parseInt( $a.css('background-position-y') );

				if (_delta > 0) {
                     
                     rate = _size + 5;
                     $a.css('background-size',_size + 5 + '%');

                 } else {

                 	if( _size == 100 ){
                 		rate = 100;
                 		return ;
                 	}else{
                 		rate = _size - 5;
                 		 $a.css('background-size',_size - 5 + '%');
                 	}
                 }

                 maxX = width * ( rate -100)/100;
                 maxY = height * ( rate -100)/100;

                 console.log( posx );
                 console.log( maxX );
                 if( Math.abs( posx ) >= maxX){
                 	posx = -maxX
                 }
                 if( Math.abs( posy ) >= maxY){
                 	posy = -maxY
                 }
                 $a.css('background-position',posx  +'px ' + posy +'px');
			});

			$ul.mousedown(function(e){

				e.preventDefault();
				x = e.pageX,y = e.pageY;

				_move=true;

				$(document).mousemove(function(e){

					e.preventDefault();
					if( _move ){

						var $a = $ul.find('li:eq('+This.index+')').find('a');
						x1 = e.pageX,
						y1 = e.pageY,

						posx = parseInt( $a.css('background-position-x') ),
						posy = parseInt( $a.css('background-position-y') ),

						disx = ( posx + x1 -x ),
						disy = ( posy + y1 -y );

						console.log( maxX );
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

						$a.css('background-position',disx  +'px ' + disy +'px');

						x = x1;
						y = y1;
					}
					
				}).mouseup(function(){
					_move=false;
				});

			});
		}
	};

	module.exports = roomBanner;
	
});
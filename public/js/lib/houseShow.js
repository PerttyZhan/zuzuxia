define(["require"],function(require){

	var imageShow = require('imageShow'),			//图片的预加载
		$thumbnail = $('.thumbnail');

	//初始高度
	$('#main .content').css('height',$(window).height()-$('#header').height()+ 200 +'px');

	//所有公寓-hover
	var reg =/^[0-9]*[0-9][0-9]*$/;
	$.each( $thumbnail,function(i,elem){
		if( reg.test( (i-1)/3 ) ){
			$(this).addClass('middle-div');
		}

	} );

	$thumbnail.hover(function(e){

		e.stopPropagation();
		$(this).find('.mask-icon').animate({
			opacity:1,
			top:0
		},200);

	},function(e){
		e.stopPropagation();
		$(this).find('.mask-icon').animate({
			opacity:0,
			top:'-40px'
		},200);
	});

	imageShow.init( $thumbnail );
})
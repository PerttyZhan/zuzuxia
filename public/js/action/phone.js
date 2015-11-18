define(["require","module","exports"],function(require,module,exports){

	var phoneClick = {
		'show-modal':function(This){
			var oParent = This.parent();
			if( oParent.hasClass('active') ){
				oParent.removeClass('active');
			}else{
				oParent.addClass('active');
			}
		},
		'phone-apt':function(This){
			var $form = This.parents('form'),
				$text = $form.find('input,select'),
				$mnl = $('#message-no-login'),
				$mas = $('#message-apt-success'),
				datas = {};


			for( var i=0,max=$text.length;i<max;i++ ){
				$text.eq(i).css('border-color','#ccc');
				datas[ $text.eq(i).attr('name') ] = $text.eq(i).val();
				if( $text.eq(i).val() == '' ){
					$text.eq(i).css('border-color','red');
					$mnl.show().addClass('fadeInAndOut animated-fadeInAndOut').find('span').text( $text.eq(i).attr('placeholder')+'不能为空' );
					return setTimeout(function(){
						$mnl.hide().removeClass('fadeInAndOut animated-fadeInAndOut');

					},1000);
				}
			}


			$.ajax({
				url:'/phoneApt',
				type:'post',
				data:'data='+JSON.stringify(datas),
				success:function(data){
					$mas.show().addClass('fadeInAndOut animated-fadeInAndOut');
					return setTimeout(function(){
						$mas.hide().removeClass('fadeInAndOut animated-fadeInAndOut');

					},1000);
				},
				error:function(err){
					console.log( err );
				}
			});

		},
		'calc-endtime':function(This){

			var $starttime = $('#starttime'),$duringtime = $('#duringtime'),$endtime = This;

			if( $starttime.val()=='' || $duringtime.val() == '' ){return;}

			var times = $starttime.val().split('-');
			var year = parseInt(times[0]),month = parseInt(times[1]),day = times[2];
			var dtime = parseInt( $duringtime.val() );

			month = month + dtime;

			if( month > 12 ){
				year+= parseInt( month/12 );
				month = ( month%12 );
			}

			if( month < 10 ){
				month = '0'+month;
			}
			$endtime.val( year + '-' + month + '-' + day );
		}
	};

	module.exports = phoneClick;
});

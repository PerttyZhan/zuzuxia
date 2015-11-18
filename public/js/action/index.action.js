define(["require","module","exports"],function(require,module,exports){

	var clickList = require('clickList'),
		header = require('action/header.action.js')
		shadow = {};

	if( !clickList.isLogin ){
		console.log('1');
		 shadow = require('action/shadow.action.js');
	}
	

 	module.exports = $.extend({},clickList,{
		'calc-endtime':function(This){

			var $starttime = this.data['$st'],
				$duringtime = this.data['$dt'],
				$endtime = This,
				times = $starttime.val().split('-'),
				year = parseInt(times[0]),month = parseInt(times[1]),day = times[2],
			 	dtime = parseInt( $duringtime.val() );

			if( !(!!$starttime.val() && !!$duringtime.val()) ){
				return this.showModal('no-login','需要起始时间和入住周期');
			}
			month = month + dtime;
			if( month > 12 ){
				year+= parseInt( month/12 );
				month = ( month%12 );
			}
			if( month < 10 ){
				month = '0'+month;
			}
			$endtime.val( year + '-' + month + '-' + day );
		},
		'index-apt':function(This){

			var require=This.data('require')
				$form = This.parents('form'),
				$input = $form.find('input[type="text"],input[type="date"]');

			if( !this.isLogin ){
				return this.showModal('no-login','您还未登录');
			}
			if( require == '' ){
				return this.showModal('no-perfect','请去个人中心完善信息(电话和姓名)');
			}

			for( var i=0,max=$input.length;i<max;i++ ){
				if( $input.eq(i).val() == '' ){
					return this.showModal('no-login',$input.eq(i).attr('placeholder')+'不能为空');
				}
			}
			This.parents('form').submit();
		}
	},shadow,header);

})
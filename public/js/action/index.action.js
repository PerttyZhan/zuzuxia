define(["require","module","exports"],function(require,module,exports){

	var clickList = require('clickList'),
		header = require('action/header.action.js')
		shadow = {};

	if( !clickList.isLogin ){
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
			var $form = This.parents('form'),
				d = this.valiForm({
					'$pt':$form
				}),
				othis = this;
			if( typeof d == 'boolean'){
				return ;
			}

			$.ajax({
			url:'/house/indexApt',
			type:'post',
			data:'data='+encodeURIComponent( JSON.stringify( d ) ),
			success:function(msg){
					if( !!msg ){
						$form.find('input').val('');
						return othis.showModal('no-perfect','预约成功,我们近期会与您联系');
					}else{
						console.log( msg );
					}
				}
			});
		}
	},shadow,header);

})
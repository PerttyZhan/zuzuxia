define(["require","module","exports"],function(require,module,exports){



	//QQ分享的
	var qqshare = {
		init:function($btn){

			this.$qqshare = $btn;
			console.log( $btn );
			this.qqconfig = {
				url:location.href,
				showcount:'0',/*是否显示分享总数,显示：'1'，不显示：'0' */
				desc:'',/*默认分享理由(可选)*/
				summary:'',/*分享摘要(可选)*/
				title:'',/*分享标题(可选)*/
				site:'',/*分享来源 如：腾讯网(可选)*/
				pics:'', /*分享图片的路径(可选)*/
				style:'203',
				width:22,
				height:22
			};
			
			this.addEvent();
		},
		addEvent:function(){

			var qq = this.qqconfig;

			var $qqshare = this.$qqshare;

			this.$qqshare.on('click',function(event){

				event.stopPropagation();
				var s = [];

				var data =  $(this).data('share');

				for( var j in data ){
					qq[j] = data[j];
				}

				for( var i in qq ){
					s.push(i + '=' + encodeURIComponent(qq[i]));
				}
				var _href = ['http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&')].join('');

				window.open( _href,'qqshare','height=500;width=500' );

			});

		}
	};

	module.exports = qqshare;
})
define(["require","module","exports"],function(require,module,exports){



	//QQ分享的
	var qqshare = {
		init:function($btn){

			this.$qqshare = $btn;

			this.qqconfig = {
				url:'http://young.so',
				desc:'描述部分',/*默认分享理由(可选)*/
				title:'如此好的房子，你还在等什么！',/*分享标题(可选)*/
				summary:'QQ登录是QQ互联的一种接入方式，通过接入QQ登录，用户可以使用QQ账号直接登录接入的站点，QQ登录同时提供API授权，帮助网站主将用户操作同步到QQ空间和朋友网；',/*分享摘要(可选)*/
				pics:'http://young.so/image/banner/banner-1.jpg|http://image.xiaozhustatic1.com/12/1,0,8,6631,825,550,ce55cb16.jpg', /*分享图片的路径(可选)*/
				site:'小猪短租网',/*分享来源 如：腾讯网(可选)*/
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
					console.log( j );
					if( j != 'pics' ){
						qq[j] = data[j];
					}
				}
				console.log( qq );
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
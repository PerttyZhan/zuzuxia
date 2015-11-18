define(["require"],function(require){

	var bannerRun = require('bannerRun'), 	//bannerRun的组件
		searchChange = require('searchChange'),	//bannerSearch的组件
		imageShow = require('imageShow'),			//图片的预加载
		clicks = require('action/index.action.js');

	var index = {
		init:function(){
			this.dataInit();	//数据缓存
			this.eventInit();	//事件初始化
			this.cpInit();		//组件初始化
		},
		dataInit:function(){

			typeof this.data == 'undefined'?this.data = {}:void(0);
			$.extend(this.data,{
				$banner:$('#banner'),					// 轮播
				$banner_search:$('#banner-search'),		//在线预定
				$thumbnail:$('.thumbnail'),				//房屋展示
				$detail:$('.detailsite,.detailtime'),	//公寓位置	,起始时间
				$dropRole:$('#dropRole'),				//下拉框
				$btnPre:$('.btn-pre'),					//轮播 上一张
				$btnNext:$('.btn-next')					//轮播 下一张
			});

			//点击事件里面的数据缓存
			typeof clicks.data == 'undefined'?clicks.data = {}:void(0);
			$.extend(clicks.data,{
				$st:$('#starttime'),
				$dt:$('#duringtime')
			});
		},
		eventInit:function(){

			var $dm = this.data['$dropRole'],
				$da = this.data['$detail'];

			/* 登录后的 */
			$dm.hover(function(e){
				e.stopPropagation();
				$(this).addClass('active');
			},function(e){
				$(this).removeClass('active');
			});

			//对于click 事件做的。用事件代理的方式
			$(document.body).on('click','[data-action]',function(e){

				e.preventDefault();
				e.stopPropagation();
				var $this = $(this),
					actionName = $this.data('action'),
					action = clicks[actionName];
				if( $.isFunction(action) ) action.call(clicks,$this);
			});

			//公寓位置等下面的a标签点击事件
			$.each( $da.find('a'),function( i,elem){

				$(elem).on('click',function(event){
					var _val = $(this).text();
					event.preventDefault();
					$(this).parents('dd').prev().css('border','none').find('input').val(_val);
				});

			});	

			//点击其它  公寓位置等下拉消失
			$(document).on('click',function(e){
				$da.removeClass('active');
			});

		},
		cpInit:function(){

			var $bp = this.data['$btnPre'],
				$bn = this.data['$btnNext'],
				$br = this.data['$banner'],
				$bs = this.data['$banner_search'],
				$th = this.data['$thumbnail'];

			var banner = new bannerRun( $br,$bp,$bn);
			searchChange.init($bs,'search-fiexd');
			imageShow.init( $th );
		}
	};

	index.init();
});
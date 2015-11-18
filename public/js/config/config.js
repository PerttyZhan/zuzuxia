
(function(){

	var options = {
		baseUrl:'./',
		shims:{
			validation:{
				url:'component/jquery-validation/dist/jquery.validate.min.js',
				factory:function(){
					return $;
				}
			},
			jquery:{
				url:"http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js",
				exports:"$"
			}
		},
		vars:{
			// 'component':'/js/Component',			//组件路径
			// 'action':'/js/action',				//事件路径
			// 'lib':'/js/lib'	,					//每个页面路口
			// 'data':'/js/data',					//数据路径				
		},
		alias:{
			'bannerRun':"component/bannerRun",
			'imageShow':"component/imageShow",
			'qqshare':"component/qqshare",
			'schoolSelect':'component/schoolSelect',
			'searchChange':'component/searchChange',
			'WdatePicker':'component/My97DatePicker/WdatePicker',
			'clickList':'action/clickList',
			'ZMB-clickList':'action/ZMB-clickList',
			'phoneClick':'action/phone',
			'mapInit':'component/mapInit',
			'allunivlist':'data/allunivlist',
			'roomBanner':'component/roomBanner',
			'fastclick':'component/fastClick',
			'Slip':'component/min.slip.js'
		},
		packages:{
			component:{
				url:'/dist/js/Component',			//组件路径
			},			
			action:{
				url:'/dist/js/action'				//事件路径
			},				
			lib:{
				url:'/dist/js/lib'					//每个页面路口
			},					
			data:{
				url:'/dist/js/data'					//数据路径
			},						
		}
	};

	kvm.module.config(options)
})()
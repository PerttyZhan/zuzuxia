
(function(){

	var options = {

		baseUrl:'./',
		shim:{
		},
		vars:{
			'component':'/js/Component',			//组件路径
			'action':'/js/action',				//事件路径
			'lib':'/js/lib'	,					//每个页面路口
			'data':'/js/data',					//数据路径				
		},
		alias:{
			'bannerRun':"{component}/bannerRun",
			'imageShow':"{component}/imageShow",
			'qqshare':"{component}/qqshare",
			'schoolSelect':'{component}/schoolSelect',
			'searchChange':'{component}/searchChange',
			'WdatePicker':'{component}/My97DatePicker/WdatePicker',
			'clickList':'{action}/clickList',
			'ZMB-clickList':'{action}/ZMB-clickList',
			'mapInit':'{component}/mapInit',
			'allunivlist':'{data}/allunivlist',
			'roomBanner':'{component}/roomBanner'
		}
	};

	kvm.module.config(options)
})()
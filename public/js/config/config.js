
(function(){

	var options = {

		baseUrl:'./',
		shim:{
			// 'Slip':{
			// 	url:'/js/Component/min.slip.js',
			// 	factory:function(){
			// 		return Slip;
			// 	}
			// }
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
			'phoneClick':'{action}/phone',
			'mapInit':'{component}/mapInit',
			'allunivlist':'{data}/allunivlist',
			'roomBanner':'{component}/roomBanner',
			'fastclick':'{component}/fastClick',
			'Slip':'{component}/min.slip.js'

		},
		packages:{
		}
	};

	kvm.module.config(options)
})()
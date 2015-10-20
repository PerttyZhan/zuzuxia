
(function(){

	var options = {

		baseUrl:'./',
		shim:{
			// BMap:{
			// 	url:'http://api.map.baidu.com/getscript?v=2.0&ak=9f5d468870788eaa79a8865781872668&services=&t='+new Date(),
			// 	exports:'BMap'
			// },
			// qqMap:{
			// 	url:'http://map.qq.com/api/js?v=2.exp&key=d84d6d83e0e51e481e50454ccbe8986b',
			// 	exports:'qq'
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
			'mapInit':'{component}/mapInit',
			'allunivlist':'{data}/allunivlist',
			'roomBanner':'{component}/roomBanner'
		}
	};

	kvm.module.config(options)
})()
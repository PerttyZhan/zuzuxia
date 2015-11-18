define(["require","module","exports"],function(require,module,exports){

	var Bmap = {
		searchType:['btnBuilding','btnBus','btnHotel','btnBank','btnSuperMarket','btnShop','btnSchool','btnHospital','btnFurniture','btnDecoration','btnGasstation'],
		init:function(el){

			// 百度地图API功能
			var map = new BMap.Map(el);
			this.local = new BMap.LocalSearch(map, {
				renderOptions:{map: map}
			});
			var point = new BMap.Point(116.331398,39.897445);
			map.centerAndZoom(point,12);
			var marker;
			var city = document.getElementById(el).getAttribute('data-map');
			var address = document.getElementById(el).getAttribute('data-address');
			// 创建地址解析器实例
			var myGeo = new BMap.Geocoder();

			this.map = map;
			this.myGeo = myGeo;

			this.getPoint(city);
			this.mapSearch();
			this.changeEvent();
		},
		mapSearch:function(){

			var local = this.local;
			var searchType = this.searchType;
			var This = this;
			searchType.forEach(function(elem,index){

				This.addEvent( document.getElementById(elem),'click', function(event){

						var _val = this.getAttribute('value');
						if( this.checked ){
							console.log(_val);
							This.local.search(_val);
						}else{
							This.local.search();
						}
						
				});
			});
		},
		addEvent:function(obj,type,fn){

			if(obj.attacheEvent){
				obj.attacheEvent( 'on'+type,fn );
			}else{
				obj.addEventListener( type,fn,false );
			}
		},
		getPoint:function(city){

			// 将地址解析结果显示在地图上,并调整地图视野
			var myGeo = this.myGeo;
			var map = this.map;
			myGeo.getPoint(city, function(point){
				if (point) {
					map.centerAndZoom(point, 16);
					map.addOverlay(new BMap.Marker(point));
				}else{
					alert("您选择地址没有解析到结果!");
				}
			},'中国');
		},
		changeEvent:function(){

			if( document.getElementById('address') == null ){return this.changeEvent = null;}
			var address = document.getElementById('address');
			var This = this;

			this.addEvent(address,'change',function(){

				var _val = this.value;
				This.getPoint.call(This,_val);
			});
		}
	};

	var tengMap = {
		init:function(el){
			this.address = document.getElementById('e2').getAttribute('data-map');
		    this.pano_service = new qq.maps.PanoramaService();
		    this.geocoder();
		},
		geocoder:function(){

			var pano_service = this.pano_service;
			var address = this.address;

			var geocoder = new qq.maps.Geocoder({
		        complete : function(result){
	                var radius;
		    		pano_service.getPano(result.detail.location,radius, function (result){
		                new qq.maps.Panorama(document.getElementById('e2'), {
					        pano: result.svid,
					        disableMove: false,
					        pov:{
					            heading:20,
					            pitch:15
					        },
					        zoom:1
					    });
		            });
		        }
		    });
		    geocoder.getLocation(address);
		}
	};

	module.exports = {
		Bmap:Bmap,
		tengMap:tengMap
	};
})
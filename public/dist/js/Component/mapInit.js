define(["require","module","exports"],function(require,module,exports){var a={searchType:["btnBuilding","btnBus","btnHotel","btnBank","btnSuperMarket","btnShop","btnSchool","btnHospital","btnFurniture","btnDecoration","btnGasstation"],init:function(a){var b=new BMap.Map(a);this.local=new BMap.LocalSearch(b,{renderOptions:{map:b}});var c=new BMap.Point(116.331398,39.897445);b.centerAndZoom(c,12);var d=document.getElementById(a).getAttribute("data-map"),e=(document.getElementById(a).getAttribute("data-address"),new BMap.Geocoder);this.map=b,this.myGeo=e,this.getPoint(d),this.mapSearch(),this.changeEvent()},mapSearch:function(){var a=(this.local,this.searchType),b=this;a.forEach(function(a,c){b.addEvent(document.getElementById(a),"click",function(a){var c=this.getAttribute("value");this.checked?b.local.search(c):b.local.search()})})},addEvent:function(a,b,c){a.attacheEvent?a.attacheEvent("on"+b,c):a.addEventListener(b,c,!1)},getPoint:function(a){var b=this.myGeo,c=this.map;b.getPoint(a,function(a){a?(c.centerAndZoom(a,16),c.addOverlay(new BMap.Marker(a))):alert("您选择地址没有解析到结果!")},"中国")},changeEvent:function(){if(null==document.getElementById("address"))return this.changeEvent=null;var a=document.getElementById("address"),b=this;this.addEvent(a,"change",function(){var a=this.value;b.getPoint.call(b,a)})}},b={init:function(a){this.address=document.getElementById("e2").getAttribute("data-map"),this.pano_service=new qq.maps.PanoramaService,this.geocoder()},geocoder:function(){var a=this.pano_service,b=this.address,c=new qq.maps.Geocoder({complete:function(b){var c;a.getPano(b.detail.location,c,function(a){new qq.maps.Panorama(document.getElementById("e2"),{pano:a.svid,disableMove:!1,pov:{heading:20,pitch:15},zoom:1})})}});c.getLocation(b)}};module.exports={Bmap:a,tengMap:b}});
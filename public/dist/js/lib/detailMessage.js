define(["require"],function(require){var a=(require("bannerRun"),require("mapInit")),b=require("clickList"),c=require("roomBanner"),d=$(window).width(),e=$(".big-img").find("img:eq(0)").css("width",d+"px").height();$(".big-img").css({opacity:1,height:e+"px"}).find(""),c.init($(".big-img"),$(".btn-pre"),$(".btn-next"),$(".small-img")),$("#e2").hide(),$("#e1").show(),$(".btn-group").show(),$(".map-title").find("a").hover(function(){$(this).attr("class","active").siblings().removeClass("active"),0==$(this).index()?($("#e2").show(),$("#e1").hide(),$(".btn-group").hide()):($("#e2").hide(),$("#e1").show(),$(".btn-group").show())}),a.Bmap.init("e1"),a.tengMap.init("e2"),$(document.body).on("click","[data-action]",function(a){a.preventDefault(),a.stopPropagation();var c=$(this),d=c.data("action"),e=b[d];$.isFunction(e)&&e.call(b,c)}),$("#dropRole").hover(function(a){a.stopPropagation(),$(this).addClass("active")},function(a){$(this).removeClass("active")})});
define(["require"],function(require){var a=require("imageShow"),b=$(".thumbnail");$("#main .content").css("height",$(window).height()-$("#header").height()+200+"px");var c=/^[0-9]*[0-9][0-9]*$/;$.each(b,function(a,b){c.test((a-1)/3)&&$(this).addClass("middle-div")}),b.hover(function(a){a.stopPropagation(),$(this).find(".mask-icon").animate({opacity:1,top:0},200)},function(a){a.stopPropagation(),$(this).find(".mask-icon").animate({opacity:0,top:"-40px"},200)}),a.init(b)});
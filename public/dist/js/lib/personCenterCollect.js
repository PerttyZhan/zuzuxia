define(["require"],function(require){var a=require("action/center.action.js"),b=require("qqshare"),c={init:function(){this.dataInit(),this.contentInit(),this.cpInit(),this.eventInit()},dataInit:function(){"undefined"==typeof this.data?this.data={}:void 0,$.extend(this.data,{$dr:$("#dropRole"),$th:$(".thumbnail"),$qs:$(".qq-login")})},eventInit:function(){var b=this.data.$dr,c=this.data.$th;b.hover(function(a){a.stopPropagation(),$(this).addClass("active")},function(a){$(this).removeClass("active")}),$(document.body).on("click","[data-action]",function(b){b.preventDefault(),b.stopPropagation();var c=$(this),d=c.data("action"),e=a[d];$.isFunction(e)&&e.call(a,c)}),c.hover(function(){$(this).find(".mask-icon").animate({top:0},200)},function(){$(this).find(".mask-icon").animate({top:"-40px"},200)})},cpInit:function(){b.init(this.data.$qs)},contentInit:function(){for(var a=this.data.$th,b=/^[0-9]*[0-9][0-9]*$/,c=0,d=a.length;d>c;c++)b.test((c-1)/3)&&a.eq(c).addClass("middle-div")}};c.init()});
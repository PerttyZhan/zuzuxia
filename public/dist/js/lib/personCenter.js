define(["require"],function(require){var a=require("clickList");$("#changeBg").on("change",function(){$(this).parent().submit()}),$("#dropRole").hover(function(a){a.stopPropagation(),$(this).addClass("active")},function(a){$(this).removeClass("active")}),$(document.body).on("click","[data-action]",function(b){b.preventDefault(),b.stopPropagation();var c=$(this),d=c.data("action"),e=a[d];$.isFunction(e)&&e.call(a,c)})});
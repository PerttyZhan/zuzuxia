define(["require"],function(require){var a=require("ZMB-clickList");$(document.body).on("click","[data-action]",function(b){b.preventDefault();var c=$(b.target),d=c.data("action"),e=a[d];$.isFunction(e)&&e(c)})});
define(["require","module","exports"],function(require,module,exports){var a=require("clickList");module.exports=$.extend(a,{"turn-page":function(a){$this=a;var b=$this.prev().val(),c=$this.prev().prev().val();b=""==b?1:b,b>c?alert("超过总数,最多只有"+c):window.location.href="personCenter?count="+b},"check-message":function(a){var b=a,c=b.prev().val();$.ajax({type:"post",url:"/reviseMessageStatus",data:"_id="+c,success:function(){b.remove()}})},"dele-collect":function(a){var b=a.data("val");$.ajax({type:"post",url:"/deleCollectHouse",data:"_id="+b,success:function(a){location.reload()},error:function(){}})}})});
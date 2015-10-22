define(["require","module","exports"],function(require,module,exports){var a=require("WdatePicker"),b={"open-login-modal":function(){var a=$("#shawdow");a.show().find(".loginFace").addClass("active fadeInUp animated-login").siblings().removeClass("active")},"open-reg-modal":function(){var a=$("#shawdow");a.show().find(".regFace").addClass("active fadeInUp animated-login").siblings().removeClass("active")},"open-getPass-modal":function(){var a=$("#shawdow");a.find(".getPassFace").addClass("active fadeInUp animated-login").siblings().removeClass("active")},"close-modal":function(){var a=$("#shawdow");a.hide().find("input").not('input[type="button"]').val(""),a.find(".error,.errorL").hide()},login:function(){var a=$("#error"),b=$("#loginForm"),c={username:b.find('input[name="username"]').val(),password:b.find('input[name="pass"]').val()};return""==c.username?a.text("账号不能为空").show():""==c.password?a.text("密码不能为空").show():void $.ajax({type:"post",url:"/loginAction",data:"username="+c.username+"&password="+c.password,success:function(b){""==b.err?location.reload():a.text(b.err).show()},error:function(a){}})},"reg-sendMessage":function(a){var b=$("#loginU"),c=b.val(),d=$("#regerror"),e=a,f=30;if("邮箱"==this.valiType(c))$("#registerForm").find('input[name="registerBy"]').val("邮箱"),d.hide();else{if("电话"!=this.valiType(c))return d.text("请输入合法的邮箱或者手机号").show();$("#registerForm").find('input[name="registerBy"]').val("电话"),d.hide()}e.html("<strong>"+f+"</strong>s后重新发送").attr("disabled","disabled"),e.timer=setInterval(function(){f--,e.html("<strong>"+f+"</strong>s后重新发送").attr("disabled","disabled"),0==f&&(clearInterval(e.timer),e.timer=null,e.removeAttr("disabled").html("发送验证码"))},1e3),$.ajax({url:"/sendMessage",type:"post",data:"src="+c,success:function(a){e.prev().val(a.val)},error:function(a){}})},"reg-submit":function(){var a=$("#registerForm"),b=$("#regerror"),c={username:a.find('input[name="username"]').val(),password:a.find('input[name="password"]').val(),registerBy:a.find('input[name="registerBy"]').val()};return""==c.username||""==c.password?b.text("用户名/密码不能空").show():a.find('input[type="checkbox"]').prop("checked")?void $.ajax({url:"/register",type:"post",data:"username="+c.username+"&password="+c.password+"&registerBy="+c.registerBy,success:function(a){return"yes"!=a.msg?b.text(a.val).show():void location.reload()},error:function(a){}}):b.text("请看协议,看后没意见请打钩").show()},"forgetPass-submit":function(){var a=$("#resetForm"),b=$("#reseterror"),c=a.find('input[name="qr"]').val(),d=a.find('input[name="sendqr"]').val(),e={username:a.find('input[name="username"]').val(),onepass:a.find('input[name="onepass"]').val(),agapass:a.find('input[name="agapass"]').val()};return""==e.username?b.text("邮箱/手机号不能空").show():""==e.onepass?b.text("密码不能空").show():""==e.agapass?b.text("确定密码不能空").show():""==c?b.text("短信验证码不能空").show():e.onepass.length<10||e.onepass.length>20?b.text("密码长度规定在10到20").show():e.onepass!=e.agapass?b.text("两次密码不一样").show():c!=d?b.text("短信验证码不正确").show():void $.ajax({url:"/resetPass",type:"post",data:"username="+e.username+"&password="+e.onepass,success:function(a){return"yes"!=a.msg?b.text(a.val).show():void location.reload()},error:function(a){}})},"forget-sendMessage":function(a){var b=$("#resetForm").find('input[name="username"]'),c=b.val(),d=$("#reseterror");$this=a;var e=30;if("邮箱"==this.valiType(c))d.hide();else{if("电话"!=this.valiType(c))return d.text("请输入合法的邮箱或者手机号").show();d.hide()}$this.html("<strong>"+e+"</strong>s后重新发送").attr("disabled","disabled"),$this.timer=setInterval(function(){e--,$this.html("<strong>"+e+"</strong>s后重新发送").attr("disabled","disabled"),0==e&&(clearInterval($this.timer),$this.timer=null,$this.removeAttr("disabled").html("发送验证码"))},1e3),$.ajax({url:"/sendMessage",type:"post",data:"src="+c,success:function(a){$this.prev().val(a.val)},error:function(a){}})},lgoinOut:function(){$.ajax({url:"/loginOut",type:"get",success:function(a){location.reload()},error:function(a){}})},"house-collect":function(a){var b=$("#message-no-login"),c=$(".apt-id").val();return null==document.getElementById("dropMenu")?(b.removeClass("fadeOutRight animated-fadeOUt").show().addClass("fadeInUp animated-login"),setTimeout(function(){b.removeClass("fadeInUp animated-login").addClass("fadeOutRight animated-fadeOUt")},1e3)):($this=a,void $.ajax({url:"/collectHouse",type:"post",data:"_id="+c,success:function(a){""!=a.err||location.reload()}}))},"house-appoint":function(a){var b=$("#message-no-login"),c=$("#message-no-perfect"),d=$("#message-apt-success");if(_id=$(".apt-id").val(),_url="",_text="",require=a.data("require"),null==document.getElementById("dropMenu"))return b.removeClass("fadeOutRight animated-fadeOUt").show().addClass("fadeInUp animated-login"),setTimeout(function(){b.removeClass("fadeInUp animated-login").addClass("fadeOutRight animated-fadeOUt")},1e3);if(""==require)return c.removeClass("fadeOutRight animated-fadeOUt").show().addClass("fadeInUp animated-login"),setTimeout(function(){c.removeClass("fadeInUp animated-login").addClass("fadeOutRight animated-fadeOUt")},1e3);$.ajax({url:"/appointHouse",type:"post",data:"_id="+_id,success:function(a){return""==a.err?(d.removeClass("fadeOutRight animated-fadeOUt").show().addClass("fadeInUp animated-login"),setTimeout(function(){d.removeClass("fadeInUp animated-login").addClass("fadeOutRight animated-fadeOUt")},1e3)):void 0}})},"check-message":function(a){var b=a,c=b.prev().val();$.ajax({type:"post",url:"/reviseMessageStatus",data:"_id="+c,success:function(){b.remove()}})},"dele-collect":function(a){var b=a.data("val");$.ajax({type:"post",url:"/deleCollectHouse",data:"_id="+b,success:function(a){location.reload()},error:function(){}})},"turn-page":function(a){$this=a;var b=$this.prev().val(),c=$this.prev().prev().val();b=""==b?1:b,b>c?alert("超过总数,最多只有"+c):window.location.href="personCenter?count="+b},"open-site-modal":function(a){a.next().hasClass("active")?a.next().removeClass("active"):a.next().addClass("active")},"open-time-modal":function(a){a.next().hasClass("active")?a.next().removeClass("active"):a.next().addClass("active")},"open-satrt-modal":function(){a()},"calc-endtime":function(a){var b=$("#starttime"),c=$("#duringtime"),d=a;if(""!=b.val()&&""!=c.val()){var e=b.val().split("-"),f=parseInt(e[0]),g=parseInt(e[1]),h=e[2],i=parseInt(c.val());g+=i,g>12&&(f+=parseInt(g/12),g%=12),10>g&&(g="0"+g),d.val(f+"-"+g+"-"+h)}},"index-apt":function(a){var b=$("#message-no-login"),c=$("#message-no-perfect"),require=a.data("require");if(null==document.getElementById("dropMenu"))return b.removeClass("fadeOutRight animated-fadeOUt").show().addClass("fadeInUp animated-login"),setTimeout(function(){b.removeClass("fadeInUp animated-login").addClass("fadeOutRight animated-fadeOUt")},1e3);if(""==require)return c.removeClass("fadeOutRight animated-fadeOUt").show().addClass("fadeInUp animated-login"),setTimeout(function(){c.removeClass("fadeInUp animated-login").addClass("fadeOutRight animated-fadeOUt")},1e3);for(var d=a.parents("form"),e=d.find('input[type="text"]'),f=0,g=e.length;g>f;f++)if(e.eq(f).parent().css("border","none"),""==e.eq(f).val())return void e.eq(f).parent().css("border","1px solid red");a.parents("form").submit()},valiType:function(a){var b=/^1\d{10}$/,c=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;return b.test(a)?"电话":c.test(a)?"邮箱":"其它"}};module.exports=b});
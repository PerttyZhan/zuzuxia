function bannerRun(a,b,c,d,e){this.$oParent=a,this.$btnPre=c,this.$btnNext=d,this.$btnNum=e,this.defaultSign=1,this.hoverfn=b,this.aLi=this.$oParent.find("li"),this.length=this.aLi.length,this.index=0,this.zIndex=1,this.autoScoll(),this.addEvent()}function valiType(a){var b=/^1\d{10}$/,c=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;return b.test(a)?"电话":c.test(a)?"邮箱":"其它"}var schoolSelect={init:function(a,b,c,d,e,f){"undefined"!=typeof allUnivList&&null!=allUnivList&&(this.$text=a,this.unlist=allUnivList,this.$gj=b,this.$sf=c,this.$list=d,this._id=$("#_id").val(),this.$intersetText=e,this.$intersetContent=f,this.initGJ(),this.addEvent())},initGJ:function(){var a=this.unlist,b=this.$gj;$.each(a,function(a,c){b.append("<a href='javascript:void(0);' onclick='schoolSelect.getSheng("+a+',"'+c.name+"\")'>"+c.name+"</a>")})},addEvent:function(){var a=this.$gj,b=this.$sf,c=this.$list,d=this.$text,e=this.$intersetContent,f=this.$intersetText,g=this;d.on("click",function(){a.show(),c.hide(),b.hide()}),f.on("focus",function(){e.show()}),f.on("change",function(){e.hide()}),e.find("a").on("click",function(a){a.preventDefault(),f.val($(this).text()),$(this).parent().hide(),$.ajax({url:"/updatePersonInfo",type:"post",data:"_id="+g._id+"&interset="+$(this).text(),success:function(a){},error:function(){}})}),c.delegate("a","click",function(e){var f=g.school;e.preventDefault(),a.hide(),c.hide(),b.hide(),f+=" - "+$(this).text(),d.val(f),$.ajax({url:"/updatePersonInfo",type:"post",data:"_id="+g._id+"&school="+f,success:function(a){},error:function(){}})})},getSheng:function(a,b){this.school=b;var c=this.unlist,d=this.$sf,e=this.$list;d.show(),e.html(""),d.html(""),0==c[a].provs.length?d.append("很抱歉！暂时没有数据（只提供了中国和美国的学校信息）"):$.each(c[a].provs,function(b,c){d.append("<a href='javascript:void(0);' onclick='schoolSelect.getSchool("+a+","+b+',"'+c.name+"\")'>"+c.name+"</a>")})},getSchool:function(a,b,c){var d=(this.$gj,this.$sf,this.$list),e=this.unlist;this.school=this.school.substring(0,2),this.school+=" - "+c,d.show(),d.html(""),$.each(e[a].provs[b].univs,function(a,b){d.append("<a href='#'>"+b.name+"</a>")}),d.append("<br style='clear:both;' />")},getRandomColor:function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6)}};bannerRun.prototype={constructor:bannerRun,version:"1.0.0",oLeft:["20px","-20px"],autoScoll:function(){var a=this;this.$oParent.find("li:eq(0)").addClass("active"),this.$oParent.timer=setInterval($.proxy(a.runPic,a),4e3)},runPic:function(a){var b=this,c=this.aLi,d=this.length,e=this.index,f=this.oLeft[e%2],g="number"==typeof a?a:d>e+1?e+1:0;this.removeEvent(),c.eq(e).css({"z-index":1,"margin-left":0,left:0}).animate({opacity:0},1500),this.numAli&&this.numAli.removeClass("active").eq(g).addClass("active"),c.eq(g).css({"z-index":10,left:f,"margin-left":0}).animate({opacity:1,left:0},1500,function(){null==b.$oParent.timer&&(b.$oParent.timer=setInterval($.proxy(b.runPic,b),4e3)),b.addEvent()}),this.index=g},addEvent:function(){var a=this;null!=this.$btnPre&&this.$btnPre.on("click",$.proxy(a.preEvent,a)),null!=this.$btnNext&&this.$btnNext.on("click",$.proxy(a.nextEvent,a)),this.$btnNum&&(this.numAli=this.$btnNum.find("li"),this.numAli.on("click",function(b){b.preventDefault(),b.stopPropagation(),a.$oParent.timer&&(clearInterval(a.$oParent.timer),a.$oParent.timer=null);var c=$(this).index();a.runPic.call(a,c)}))},removeEvent:function(){null!=this.$btnPre&&this.$btnPre.off("click"),null!=this.$btnNext&&this.$btnNext.off("click"),this.$btnNum&&this.numAli.off("click")},preEvent:function(){var a=this;this.$oParent.timer&&(clearInterval(this.$oParent.timer),this.$oParent.timer=null);var b=this.index,c=0>b-1?this.aLi.length-1:b-1;this.runPic.call(a,c)},nextEvent:function(){var a=this;this.$oParent.timer&&(clearInterval(this.$oParent.timer),this.$oParent.timer=null);var b=this.index,c=b+1<this.aLi.length?b+1:this.aLi.length-1;this.runPic.call(a,c)},numToPic:function(){}};var searchChange={init:function(a,b){this.$oParent=a,this.oTop=this.$oParent.css("top"),this._class=b,this.addEvent()},addEvent:function(){var a=this;$(document).on("scroll",$.proxy(a.scollEvent,a))},scollEvent:function(a){$(document).scrollTop()>parseInt(this.oTop)+50?this.$oParent.addClass(this._class):this.$oParent.removeClass(this._class)}},qqshare={init:function(a){this.$qqshare=a,this.qqconfig={url:location.href,showcount:"0",desc:"",summary:"",title:"",site:"",pics:"",style:"203",width:22,height:22},this.addEvent()},addEvent:function(){var a=this.qqconfig;this.$qqshare;this.$qqshare.on("click",function(b){b.stopPropagation();var c=[],d=$(this).data("share");for(var e in d)a[e]=d[e];for(var f in a)c.push(f+"="+encodeURIComponent(a[f]));var g=["http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",c.join("&")].join("");window.open(g,"qqshare","height=500;width=500")})}},imageShow={init:function(a){for(var b=a,c=[],d=0,e=b.length;e>d;d++){var f=this.getSubClient(b.eq(d));c.push({obj:b.eq(d),json:f,img:b.eq(d).find("img:eq(0)")})}this.arr=c,this.initImage(),this.initEvent()},initImage:function(){},initEvent:function(){var a=this;$(window).scroll($.proxy(function(){var a,b=this.arr,c=[];if(0==b.length)return void $(window).unbind("scroll");for(var d=this.getClient(),e={},f=0,g=b.length;g>f;f++)e=this.getSubClient(b[f].obj),this.intens(d,e)?(a=b[f].img.data("src"),b[f].img.attr("src",a),b[f].obj.css({"-webkit-animation":"slide .8s ease 0s both",animation:"slide .8s ease 0s both"}).fadeIn(800)):c.push(b[f]);this.arr=c},a))},getClient:function(){var a,b,c,d;return a=$(window).scrollLeft(),b=$(window).scrollTop(),c=$(window).width(),d=$(window).height(),{left:a,top:b,width:c,height:d}},getSubClient:function(a){var b,c,d=0,e=0;return d=a.offset().left,e=a.offset().top,b=a.width(),c=a.height(),{left:d,top:e,width:b,height:c}},intens:function(a,b){var c,d,e,f,g,h;return c=a.left+a.width/2,d=b.left+b.width/2,e=a.top+a.height/2,f=b.top+b.height/2,g=(a.width+b.width)/2,h=(a.height+b.height)/2,Math.abs(c-d)<g&&Math.abs(e-f)<h}};$(document).ready(function(){var a=$("#header"),b=$("#banner"),c=$("#main"),d=$("#footer"),e=$("#roomShow"),f=$("#banner-search"),g=$("#error"),h=$(".thumbnail");b.css("opacity",1).find("ul").height(b.find("a").height()).find("li:eq(0)").addClass("active"),e.css("opacity",1).find("ul").height(e.find("a").height()).find("li:eq(0)").addClass("active");var i=setInterval(function(){if(b.length<=0||b.height()){if(clearInterval(i),i=null,c.css("margin-top",b.height()-a.height()+"px"),b.length>0&&$("body").height()<$(window).height()){var e=$(window).height()-b.height()-d.height();c.css("min-height",e+"px")}f.css("top",parseInt(c.css("margin-top"))-f.height()+"px").show()}},20);new bannerRun(b,function(){},$(".btn-pre"),$(".btn-next")),new bannerRun(e,function(){},$(".btn-pre"),$(".btn-next"));$.each($(".scoll-pic"),function(a,b){new bannerRun($(b),function(){},null,null,$(b).parent().find(".sroll-num"))}),searchChange.init(f,"search-fiexd"),imageShow.init(h),$.each($(".chooseSite,.choosetime"),function(a,b){$(b).on("click",function(a){a.preventDefault(),a.stopPropagation(),$(this).next().hasClass("active")?$(this).next().removeClass("active"):$(this).next().addClass("active")})}),$.each($(".detailsite,.detailtime").find("a"),function(a,b){$(b).on("click",function(a){var b=$(this).text();a.preventDefault(),a.stopPropagation(),$(this).parent().removeClass("active").prev().find("input").val(b)})}),$("#endtime").on("click",function(){if(""!=$("#starttime").val()&&""!=$("#duringtime").val()){var a=$("#starttime").val().split("-"),b=parseInt(a[0]),c=parseInt(a[1]),d=a[2],e=parseInt($("#duringtime").val());c+=e,c>12&&(b+=parseInt(c/12),c%=12),10>c&&(c="0"+c),$(this).val(b+"-"+c+"-"+d)}}),$("#e2").show(),$("#e1").hide(),$(".map-title").find("li").hover(function(){$(this).attr("class","active").siblings().removeClass("active"),0==$(this).index()?($("#e2").show(),$("#e1").hide(),$(".btn-group").hide()):($("#e2").hide(),$("#e1").show(),$(".btn-group").show())}),$("#login").on("click",function(a){a.preventDefault(),$("#shawdow").show().find(".loginFace").addClass("active fadeInUp animated-login").siblings().removeClass("active")}),$("#reg").on("click",function(a){a.preventDefault(),$("#shawdow").show().find(".regFace").addClass("active fadeInUp animated-login").siblings().removeClass("active")}),$("#forgetPass").on("click",function(a){a.preventDefault(),$("#shawdow").find(".getPassFace").addClass("active fadeInUp animated-login").siblings().removeClass("active")}),$(".close").on("click",function(a){a.preventDefault(),$("#shawdow").hide().find("input").not('input[type="button"]').val(""),$("#shawdow").find(".error,.errorL").hide()}),$("#btn-lg").on("click",function(){var a=$("#loginForm"),b={username:a.find('input[name="username"]').val(),password:a.find('input[name="pass"]').val()};return""==b.username?g.text("账号不能为空").show():""==b.password?g.text("密码不能为空").show():void $.ajax({type:"post",url:"/loginAction",data:"username="+b.username+"&password="+b.password,success:function(a){""==a.err?location.reload():g.text(a.err).show()},error:function(a){}})}),$("#dropRole").hover(function(a){a.stopPropagation(),$(this).find(".dropMenu").fadeIn().show()},function(a){$(this).find(".dropMenu").hide()}),qqshare.init($("#qq-share")),$("#loginOut").on("click",function(a){a.preventDefault(),$.ajax({url:"/loginOut",type:"get",success:function(a){location.reload()},error:function(a){}})});var j=$("#_id").val();$("#personInfoFrom").delegate("input","change",function(){var a=$(this).attr("name"),b=$(this).val();return""==b?(g.text("内容不能空").show(),$(this).focus()):void $.ajax({url:"/updatePersonInfo",type:"post",data:"_id="+j+"&"+a+"="+b,success:function(a){},error:function(){}})}),$.each($(".center-message").find(".title"),function(a,b){$(b).find("a").on("click",function(a){a.preventDefault(),$(this).parents("tr").next().find("div").slideToggle()})}),$(".check").on("click",function(){var a=$(this),b=a.prev().val();$.ajax({type:"post",url:"/reviseMessageStatus",data:"_id="+b,success:function(){a.remove()}})}),$("#btn-apt").on("click",function(a){if(a.preventDefault(),null==document.getElementById("dropMenu"))return alert("请先登录");var b=$(".apt-id").val();$(this);$.ajax({url:"/appointHouse",type:"post",data:"_id="+b,success:function(a){""!=a.err||location.reload()}})}),$("#send-code").on("click",function(a){a.preventDefault();var b=$("#loginU"),c=b.val(),d=$("#regerror"),e=$(this),f=30;if("邮箱"==valiType(c))$("#registerForm").find('input[name="registerBy"]').val("邮箱"),d.hide();else{if("电话"!=valiType(c))return d.text("请输入合法的邮箱或者手机号").show();$("#registerForm").find('input[name="registerBy"]').val("电话"),d.hide()}e.html("<strong>"+f+"</strong>s后重新发送").attr("disabled","disabled"),e.timer=setInterval(function(){f--,e.html("<strong>"+f+"</strong>s后重新发送").attr("disabled","disabled"),0==f&&(clearInterval(e.timer),e.timer=null,e.removeAttr("disabled").html("发送验证码"))},1e3),$.ajax({url:"/sendMessage",type:"post",data:"src="+c,success:function(a){e.prev().val(a.val)},error:function(a){}})}),$("#register").on("click",function(a){a.preventDefault();var b=$("#registerForm"),c=$("#regerror"),d={username:b.find('input[name="username"]').val(),password:b.find('input[name="password"]').val(),registerBy:b.find('input[name="registerBy"]').val()};return""==d.username||""==d.password?c.text("用户名/密码不能空").show():""==b.find('input[name="qr"]').val()||b.find('input[name="qr"]').val()!=b.find('input[name="sendqr"]').val()?c.text("验证码不正确").show():b.find('input[type="checkbox"]').prop("checked")?void $.ajax({url:"/register",type:"post",data:"username="+d.username+"&password="+d.password+"&registerBy="+d.registerBy,success:function(a){return"yes"!=a.msg?c.text(a.val).show():void location.reload()},error:function(a){}}):c.text("请看协议,看后没意见请打钩").show()}),$("#resetPass").on("click",function(){var a=$("#resetForm"),b=$("#reseterror"),c=a.find('input[name="qr"]').val(),d=a.find('input[name="sendqr"]').val(),e={username:a.find('input[name="username"]').val(),onepass:a.find('input[name="onepass"]').val(),agapass:a.find('input[name="agapass"]').val()};return""==e.username?b.text("邮箱/手机号不能空").show():""==e.onepass?b.text("密码不能空").show():""==e.agapass?b.text("确定密码不能空").show():""==c?b.text("短信验证码不能空").show():e.onepass.length<10||e.onepass.length>20?b.text("密码长度规定在10到20").show():e.onepass!=e.agapass?b.text("两次密码不一样").show():c!=d?b.text("短信验证码不正确").show():void $.ajax({url:"/resetPass",type:"post",data:"username="+e.username+"&password="+e.onepass,success:function(a){return"yes"!=a.msg?b.text(a.val).show():void location.reload()},error:function(a){}})}),$("#reset-code").on("click",function(a){a.preventDefault();var b=$("#resetForm").find('input[name="username"]'),c=b.val(),d=$("#reseterror"),e=$(this),f=30;if("邮箱"==valiType(c))d.hide();else{if("电话"!=valiType(c))return d.text("请输入合法的邮箱或者手机号").show();d.hide()}e.html("<strong>"+f+"</strong>s后重新发送").attr("disabled","disabled"),e.timer=setInterval(function(){f--,e.html("<strong>"+f+"</strong>s后重新发送").attr("disabled","disabled"),0==f&&(clearInterval(e.timer),e.timer=null,e.removeAttr("disabled").html("发送验证码"))},1e3),$.ajax({url:"/sendMessage",type:"post",data:"src="+c,success:function(a){e.prev().val(a.val)},error:function(a){}})});var k=setInterval(function(){var a=$(".scoll-pic").find("li").height();a>0&&($(".scoll-pic").height(a),clearInterval(k),k=null)},1e3);$("#changeBg").on("change",function(){$(this).parent().submit()}),$(".thumbnail").hover(function(a){a.stopPropagation(),$(this).find(".mask-icon").animate({opacity:1,top:0},200)},function(a){a.stopPropagation(),$(this).find(".mask-icon").animate({opacity:0,top:"-40px"},200)}),$("#apt-dele").on("click",function(){var a=$(this).parents(".thumbnail").find('input[name="_id"]').val();$.ajax({url:"/removeAppointHouse",type:"post",data:"_id="+a,success:function(a){location.reload()},error:function(){}})}),schoolSelect.init($("#schoolText"),$("#gj"),$("#sf"),$("#list"),$("#intersetText"),$(".interset-type"))});
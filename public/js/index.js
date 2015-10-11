


function bannerRun(oParent,hoverfn,btnPre,btnNext,btnNum){

	this.$oParent = oParent;
	this.$btnPre = btnPre;
	this.$btnNext = btnNext;
	this.$btnNum = btnNum;
	this.defaultSign = 1;
	this.hoverfn = hoverfn;
	this.aLi = this.$oParent.find('li');
	this.length = this.aLi.length;
	this.index = 0;
	this.zIndex = 1;
	this.autoScoll();
	this.addEvent();
}

bannerRun.prototype = {

	constructor:bannerRun,
	version:'1.0.0',
	oLeft:['20px','-20px'],
	autoScoll:function(){

		var This = this;
		this.$oParent.find('li:eq(0)').addClass('active');
		this.$oParent.timer = setInterval( $.proxy( This.runPic,This ),4000 );
	},
	runPic:function(target){


		var This = this;
		var aLi = this.aLi;
		var length = this.length;
		var oIndex = this.index;
		var oLeft = this.oLeft[oIndex%2];
		var targetIndex = (typeof target == 'number')? target:(oIndex+1 < length)?oIndex+1:0;

		this.removeEvent();

		aLi.eq( oIndex ).css({
			'z-index':1,
			'margin-left': 0,
			left:0
		}).animate({
			opacity:0
		},1500);

		if( this.numAli ){
			
			this.numAli.removeClass('active').eq(targetIndex).addClass('active');
		}

		aLi.eq( targetIndex ).css({
			'z-index':10,
			left:oLeft,
			'margin-left': 0
		}).animate({
			opacity:1,
			left:0
		},1500,function(){

			if( This.$oParent.timer == null){
				This.$oParent.timer = setInterval( $.proxy( This.runPic,This ),4000 );
			}
			This.addEvent();
		});

		this.index = targetIndex;
	},
	addEvent:function(){

		var This = this;
		if( this.$btnPre != null ){
			this.$btnPre.on('click',$.proxy( This.preEvent,This ) );
		}
		if( this.$btnNext != null ){
			this.$btnNext.on('click',$.proxy( This.nextEvent,This ) );
		}
		if( this.$btnNum ){

			this.numAli = this.$btnNum.find('li');
			this.numAli.on('click',function(event){

				event.preventDefault();
				event.stopPropagation();

				if( This.$oParent.timer ){


					clearInterval( This.$oParent.timer );
					This.$oParent.timer = null;
				}
				var targetIndex = $(this).index();
				This.runPic.call(This,targetIndex);
			});
		}
	},
	removeEvent:function(){

		var This = this;
		if( this.$btnPre != null ){
			this.$btnPre.off('click');
		}
		if( this.$btnNext != null ){
			this.$btnNext.off('click' );
		}
		if( this.$btnNum ){
			this.numAli.off('click');
		}

	},
	preEvent:function(){

		var This = this;

		if( this.$oParent.timer ){
			clearInterval( this.$oParent.timer );
			this.$oParent.timer = null;
		}

		var oIndex = this.index;
		var targetIndex = (oIndex - 1 < 0 )?(this.aLi.length-1):(oIndex - 1);

		this.runPic.call(This,targetIndex);
	},
	nextEvent:function(){
		var This = this;

		if( this.$oParent.timer ){
			clearInterval( this.$oParent.timer );
			this.$oParent.timer = null;
		}

		var oIndex = this.index;
		var targetIndex = (oIndex + 1 < this.aLi.length )?(oIndex + 1):0;

		this.runPic.call(This,targetIndex);
	},
	numToPic:function(){
		
	}
};

var schoolSelect = {
	init:function($text,$gj,$sf,$list,$intersetText,$intersetContent){

		if( typeof allUnivList == "undefined" || allUnivList == null  ){
			return;
		}

		this.$text = $text;
		this.unlist = allUnivList;
		this.$gj = $gj;
		this.$sf = $sf;
		this.$list = $list;
		this._id = $('#_id').val();

		this.$intersetText = $intersetText;
		this.$intersetContent = $intersetContent;

		this.initGJ();
		this.addEvent();
	},
	initGJ:function(){

		var allUnivList = this.unlist;
		var $gj = this.$gj;

		$.each(allUnivList,function (j,m){		
			$gj .append("<a href='javascript:void(0);' onclick='schoolSelect.getSheng("+j+",\""+m.name+"\")'>"+m.name+"</a>");			
		});

		
	},
	addEvent:function(){

		var $gj = this.$gj ;
		var $sf = this.$sf ;
		var $list = this.$list ;
		var $text = this.$text;
		var $intersetContent = this.$intersetContent;
		var $intersetText = this.$intersetText;
		var This = this;
		

		$text.on('click',function(){
			$gj.show();
			$list.hide();
			$sf.hide();
		});
		$intersetText.on('focus',function(){
			$intersetContent.show();
		});

		$intersetText.on('change',function(){

			$intersetContent.hide();

		});
		$intersetContent.find('a').on('click',function(event){

			event.preventDefault();
			$intersetText.val( $(this).text() );
			$(this).parent().hide();

			$.ajax({
				url:'/updatePersonInfo',
				type:'post',
				data:'_id='+This._id+'&interset='+$(this).text(),
				success:function(msg){

				},
				error:function(){

				}
			});
		});

		$list.delegate('a','click',function(event){

			var school = This.school;
			event.preventDefault();
			$gj.hide();
			$list.hide();
			$sf.hide();
			school += " - "+$(this).text();
			$text.val(school);

			$.ajax({
				url:'/updatePersonInfo',
				type:'post',
				data:'_id='+This._id+'&school='+school,
				success:function(msg){

				},
				error:function(){

				}
			});
		});
	},
	getSheng:function(aid,name){

		this.school = name;
		var allUnivList = this.unlist;
		var $sf = this.$sf ;
		var $list = this.$list ;

		$sf.show();
		$list.html('');
		$sf.html('');
		if (allUnivList[aid].provs.length == 0){
			$sf.append("很抱歉！暂时没有数据（只提供了中国和美国的学校信息）");
		}
		else
		{
			$.each(allUnivList[aid].provs,function (j,m){				
				$sf.append("<a href='javascript:void(0);' onclick='schoolSelect.getSchool("+aid+","+j+",\""+m.name+"\")'>"+m.name+"</a>");
			});
		}
	},
	getSchool:function(gid,pid,name){

		var $gj = this.$gj ;
		var $sf = this.$sf ;

		var $list = this.$list ;
		var allUnivList = this.unlist;

		this.school = this.school.substring(0,2);
		this.school += " - "+name;
		$list.show();
		$list.html('');
		$.each(allUnivList[gid].provs[pid].univs,function (k,l){
			$list.append("<a href='#'>"+l.name+"</a>");
		});
		$list.append("<br style='clear:both;' />");
	},
	getRandomColor:function(){
		return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6); 
	}

}
var searchChange = {

	init:function(oParent,overClass){

		this.$oParent = oParent;
		this.oTop = this.$oParent.css('top');
		this._class = overClass;
		this.addEvent();
	},
	addEvent:function(){

		var This = this;
		$(document).on('scroll',$.proxy(This.scollEvent,This) );
	},
	scollEvent:function(event){

		if( $(document).scrollTop() > parseInt( this.oTop )+50 ){

			this.$oParent.addClass( this._class );
		}else{
			this.$oParent.removeClass( this._class );
		}
	}
};

var qqshare = {
	init:function($btn){

		this.$qqshare = $btn;
		this.qqconfig = {
			url:location.href,
			showcount:'0',/*是否显示分享总数,显示：'1'，不显示：'0' */
			desc:'',/*默认分享理由(可选)*/
			summary:'',/*分享摘要(可选)*/
			title:'',/*分享标题(可选)*/
			site:'',/*分享来源 如：腾讯网(可选)*/
			pics:'', /*分享图片的路径(可选)*/
			style:'203',
			width:22,
			height:22
		};
		
		this.addEvent();
	},
	addEvent:function(){

		var qq = this.qqconfig;

		var $qqshare = this.$qqshare;

		this.$qqshare.on('click',function(event){

			event.stopPropagation();
			var s = [];

			var data =  $(this).data('share');

			for( var j in data ){
				qq[j] = data[j];
			}

			for( var i in qq ){
				s.push(i + '=' + encodeURIComponent(qq[i]));
			}
			var _href = ['http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&')].join('');

			window.open( _href,'qqshare','height=500;width=500' );

		});

	}
};

var imageShow = {
	init:function($img){

		var $oAi = $img;

		var arr = [];
		for( var i=0,max=$oAi.length;i<max;i++){

			var config = this.getSubClient( $oAi.eq(i) );

			arr.push({
				obj:$oAi.eq(i),
				json:config,
				img:$oAi.eq(i).find('img:eq(0)')
			});
		}
		this.arr = arr;

		
		this.initImage();
		this.initEvent();

	},
	initImage:function(){

	},
	initEvent:function(){

		var This = this;
		$(window).scroll( $.proxy(function(){

			var _arr = this.arr,_src,s_arr=[];

			if( _arr.length == 0 ){
				$ (window).unbind('scroll');
				return ;
			}
			var win_json = this.getClient(),obj_json={};

			for( var i=0,max=_arr.length;i<max;i++){

				obj_json = this.getSubClient( _arr[i].obj );
				
				if( this.intens( win_json,obj_json ) ){

					_src = _arr[i].img.data('src');
					_arr[i].img.attr('src',_src);
					_arr[i].obj.css({
						'-webkit-animation': 'slide .8s ease 0s both',
  						'animation': 'slide .8s ease 0s both'
					}).fadeIn(800);
				}else{
					s_arr.push( _arr[i] )
				}

			}
			 
			this.arr = s_arr;
		},This) );
	},
	getClient:function(){
		//返回浏览器的可视区域位置

		var l,t,w,h;

		l = $(window).scrollLeft();
		t = $(window).scrollTop();
		w = $(window).width();
		h = $(window).height();

		return {left:l,top:t,width:w,height:h};
	},
	getSubClient:function($p){
		// 返回待加载资源位置

		var l=0,t=0,w,h;

		l = $p.offset().left;
		t = $p.offset().top;
		w = $p.width();
		h = $p.height();

		return {left:l,top:t,width:w,height:h}
	},
	intens:function(rec1,rec2){
		// 判断两个矩形是否相交,返回一个布尔值 

		var lc1,lc2,tc1,tc2,w1,h1;

		lc1 = rec1.left + rec1.width/2;
		lc2 = rec2.left + rec2.width/2;
		tc1 = rec1.top + rec1.height/2;
		tc2 = rec2.top + rec2.height/2;
		w1 = ( rec1.width + rec2.width )/2;
		h1 = ( rec1.height + rec2.height )/2;

		return Math.abs(lc1 - lc2) < w1 && Math.abs(tc1 - tc2) < h1;

	}
};

$(document).ready(function(){

	var $header = $('#header');
	var $banner = $('#banner');
	var $main = $('#main');
	var $footer = $('#footer')
	var $roomBanner = $('#roomShow');
	var $banner_search = $('#banner-search');
	var $error = $('#error');
	var $thumbnail = $('.thumbnail');


	var url = window.location.href.split('\/');

	/* 属于首页部分 */
	if( $banner.length > 0 ){

		console.log( 'load index js' );

		$banner.css('opacity',1).find('ul').height( $banner.find('a').height() ).find('li:eq(0)').addClass('active');

		var bannerTimer = $banner.length >=0?setInterval(function(){
			if( $banner.height() ){

				clearInterval( bannerTimer );
				bannerTimer = null;
				$main.css( 'margin-top',$banner.height()-$header.height()+'px' );

				if( $banner.length > 0 && $('body').height() < $(window).height() ){

					var _height = $(window).height() - $banner.height() - $footer.height();
					$main.css( 'min-height',_height+'px' );
				}
				$banner_search.css('top',parseInt($main.css('margin-top'))-$banner_search.height() + 'px').show();
			}
		},20):null;
		var banner = new bannerRun( $banner,function(){},$('.btn-pre'),$('.btn-next'));
		searchChange.init($banner_search,'search-fiexd');

		imageShow.init( $thumbnail );

		$.each( $('.chooseSite,.choosetime'),function(index,elem){

			$(elem).on('click',function(e){

				e.preventDefault();
				e.stopPropagation();
				$(this).next().hasClass('active')?$(this).next().removeClass('active'):$(this).next().addClass('active');
			});
		});

		$.each( $('.detailsite,.detailtime').find('a'),function(index,elem){

			$(elem).on('click',function(event){
				var _val = $(this).text();
				event.preventDefault();
				event.stopPropagation();

				$(this).parents('dd').removeClass('active').prev().find('input').val(_val);
			});

		} );

		$('#endtime').on('click',function(){

			if( $('#starttime').val()=='' || $('#duringtime').val() == '' ){return;}
			var times = $('#starttime').val().split('-');
			var year = parseInt(times[0]),month = parseInt(times[1]),day = times[2];
			var dtime = parseInt( $('#duringtime').val() );

			month = month + dtime;

			if( month > 12 ){
				year+= parseInt( month/12 );
				month = ( month%12 );
			}

			if( month < 10 ){
				month = '0'+month;
			}
			$(this).val( year + '-' + month + '-' + day );
		});


		$('#apt-sub').on('click',function(ev){

			ev.preventDefault();

			// var site,start,end;
			if( document.getElementById('dropMenu') == null ){

				return $('#apt-fail').show().addClass('fadeInDown animated-login');
			}

			var $form = $(this).parents('form'),$input = $form.find('input[type="text"]');

			for( var i=0,max=$input.length;i<max;i++ ){
				$input.eq(i).parent().css('border','none');
				if( $input.eq(i).val() == '' ){
					$input.eq(i).parent().css('border','1px solid red');
					return ;
				}
			}

			$(this).parents('form').submit();
		});	
	}

	/* 属于详情的部分 */
	
	if( $roomBanner.length > 0 ){

		console.log( 'load detail js' );
		$roomBanner.css('opacity',1).find('ul').height( $roomBanner.find('a').height() ).find('li:eq(0)').addClass('active');
		var roomBanner = new bannerRun( $roomBanner,function(){},$('.btn-pre'),$('.btn-next'));

		$('#e2').hide();
		$('#e1').show();
		$('.map-title').find('li').hover(function(){
			
			$(this).attr('class','active').siblings().removeClass('active');
			if( $(this).index() == 0 ){

				$('#e2').show();
				$('#e1').hide();
				$('.btn-group').hide();
			}else{
				$('#e2').hide();
				$('#e1').show()
				$('.btn-group').show();
			}

		});

		$('#btn-apt').on('click',function(event){

			event.preventDefault();

			if( document.getElementById('dropMenu') == null ){

				return alert('请先登录');
			}
			var _id = $('.apt-id').val();
			var $this = $(this);
			var _url = '',_text = '';

			
			$.ajax({
			url:'/appointHouse',
			type:'post',
			data:'_id='+_id,
			success:function(msg){

					if( msg.err !='' ){
						console.log( msg.err );
					}else{
						console.log( msg.yes );

						location.reload();
					}
				}
			});
			
		});
	}

	/* 登录前共有的登录，注册部分 */

		//点击登录按钮的
		$('.login').on('click',function(event){

				event.preventDefault();
				$('#apt-fail').removeClass('fadeInDown animated-login').hide();
				$('#shawdow').show().find('.loginFace').addClass('active fadeInUp animated-login').siblings().removeClass('active');
		});
			//点击注册按钮
		$('.reg').on('click',function(event){

				event.preventDefault();
				$('#apt-fail').removeClass('fadeInDown animated-login').hide();
				$("#shawdow").show().find('.regFace').addClass('active fadeInUp animated-login').siblings().removeClass('active');
		});
			//忘记密码
		$('#forgetPass').on('click',function(event){
				event.preventDefault();

				$('#shawdow').find('.getPassFace').addClass('active fadeInUp animated-login').siblings().removeClass('active');
		});
			//点击叉叉
		$(".close").on('click',function(event){

			event.preventDefault();

			$("#shawdow").hide().find('input').not('input[type="button"]').val('');
			$("#shawdow").find('.error,.errorL').hide();

		});
			//登录里面的登录
		$('#btn-lg').on('click',function(){

			var $loginForm = $('#loginForm');

			var user = {
				username : $loginForm.find('input[name="username"]').val(),
				password : $loginForm.find('input[name="pass"]').val()
			};

			if( user.username == '' ){

				return $error.text('账号不能为空').show();
			};
			if( user.password == '' ){
				return $error.text('密码不能为空').show();
			};

			$.ajax({
				type:'post',
				url:'/loginAction',
				data:'username='+user.username+'&password='+user.password,
				success:function(msg){
					if( msg.err == '' ){
						location.reload();
					}else{
						$error.text(msg.err).show();
					}
				},
				error:function(err){
					

				}
			});
		});
			//注册里面的发送短信
		$('#send-code').on('click',function(event){

			event.preventDefault();

			var $loginu = $('#loginU');
			var _val = $loginu.val();
			var $error = $('#regerror');
			var $this = $(this);
			var second = 30;

			if( valiType( _val ) == '邮箱' ){

				$('#registerForm').find('input[name="registerBy"]').val('邮箱');
				$error.hide();

			}else if( valiType( _val ) == '电话' ){

				$('#registerForm').find('input[name="registerBy"]').val('电话');
				$error.hide();

			}else{
				return $error.text('请输入合法的邮箱或者手机号').show();
			}

			$this.html('<strong>'+second+'</strong>s后重新发送').attr('disabled','disabled');

			$this.timer = setInterval(function(){
				second--;
				$this.html('<strong>'+second+'</strong>s后重新发送').attr('disabled','disabled');

				if( second == 0 ){

					clearInterval( $this.timer  );
					$this.timer = null ;

					$this.removeAttr('disabled').html('发送验证码');
				}
			},1000);
			$.ajax({
				url:'/sendMessage',
				type:'post',
				data:'src='+_val,
				success:function(msg){

					$this.prev().val( msg.val );

				},
				error:function(err){

				}

			});
		});

		//注册验证
		$('#register').on('click',function(event){
			event.preventDefault();

			var $register = $('#registerForm');
			var $error = $('#regerror');
			var register = {
				username:$register.find('input[name="username"]').val(),
				password:$register.find('input[name="password"]').val(),
				registerBy:$register.find('input[name="registerBy"]').val()
			};

			if( register.username == '' || register.password == ''){
				return $error.text('用户名/密码不能空').show();
			}

			if( $register.find('input[name="qr"]').val() == '' || ( $register.find('input[name="qr"]').val() != $register.find('input[name="sendqr"]').val() ) ){
				return $error.text('验证码不正确').show();
			}
			if( !$register.find('input[type="checkbox"]').prop('checked')){
				return $error.text('请看协议,看后没意见请打钩').show();
			}

			$.ajax({
				url:'/register',
				type:'post',
				data:'username='+register.username+'&password='+register.password+'&registerBy='+register.registerBy,
				success:function(msg){
					if( msg.msg == 'yes' ){

						location.reload();
					}else{
						console.log(msg);
						return $error.text(msg.val).show();
					}
				},
				error:function(err){
					console.log( err );
				}
			});
		});
		//忘记密码里面的提交
		$('#resetPass').on('click',function(){
			var $resetPass = $('#resetForm');
			var $error = $('#reseterror');
			var wcode = $resetPass.find('input[name="qr"]').val();
			var scode = $resetPass.find('input[name="sendqr"]').val();


			var user = {
				username:$resetPass.find('input[name="username"]').val(),
				onepass:$resetPass.find('input[name="onepass"]').val(),
				agapass:$resetPass.find('input[name="agapass"]').val()
			};

			if( user.username == ''){
				return $error.text('邮箱/手机号不能空').show();
			}
			if( user.onepass == ''){
				return $error.text('密码不能空').show();
			}
			if( user.agapass == ''){
				return $error.text('确定密码不能空').show();
			}
			if( wcode == '' ){
				return $error.text('短信验证码不能空').show();
			}

			if( user.onepass.length <10 || user.onepass.length >20 ){
				return $error.text('密码长度规定在10到20').show();
			}
			
			if( user.onepass != user.agapass ){
				return $error.text('两次密码不一样').show();
			}

			if( wcode != scode ){
				return $error.text('短信验证码不正确').show();
			}

			$.ajax({
				url:'/resetPass',
				type:'post',
				data:'username='+user.username+'&password='+user.onepass,
				success:function(msg){
					if( msg.msg == 'yes' ){

						location.reload();
					}else{
						console.log(msg);
						return $error.text(msg.val).show();
					}
				},
				error:function(err){
					console.log( err );
				}
			});
		});

		//忘记密码时的发送验证码
		$('#reset-code').on('click',function(event){

			event.preventDefault();

			var $loginu = $('#resetForm').find('input[name="username"]');
			var _val = $loginu.val();
			var $error = $('#reseterror');
			var $this = $(this);
			var second = 30;

			if( valiType( _val ) == '邮箱' ){

				$error.hide();

			}else if( valiType( _val ) == '电话' ){

				$error.hide();

			}else{
				return $error.text('请输入合法的邮箱或者手机号').show();
			}

			$this.html('<strong>'+second+'</strong>s后重新发送').attr('disabled','disabled');

			$this.timer = setInterval(function(){
				second--;
				$this.html('<strong>'+second+'</strong>s后重新发送').attr('disabled','disabled');

				if( second == 0 ){

					clearInterval( $this.timer  );
					$this.timer = null ;

					$this.removeAttr('disabled').html('发送验证码');
				}
			},1000);
			$.ajax({
				url:'/sendMessage',
				type:'post',
				data:'src='+_val,
				success:function(msg){
					$this.prev().val( msg.val );

				},
				error:function(err){

				}

			});
		});
		//登出
		$('#loginOut').on('click',function(event){

			event.preventDefault();
			$.ajax({
				url:'/loginOut',
				type:'get',
				success:function(msg){

					location.reload();
				},
				error:function(err){
					console.log(err);
				}
			});
		});
	/* 登录后的 */

	$('#dropRole').hover(function(e){
		e.stopPropagation();
		$(this).find('.dropMenu').fadeIn().show();
	},function(e){
		
		$(this).find('.dropMenu').hide();
	});

	if( url[url.length -1] === 'personCenterMe' ){

		//我的信息改变
		console.log( 'load personCenterMe js' );
		var _id = $('#_id').val();
		$('#personInfoFrom').delegate('input','change',function(){

			var name = $(this).attr('name');
			var value = $(this).val();
			if( value == '' ){
				$error.text('内容不能空').show();
				return $(this).focus();
			}

			$.ajax({
				url:'/updatePersonInfo',
				type:'post',
				data:'_id='+_id+'&'+name+'='+value,
				success:function(msg){

				},
				error:function(){

				}
			});
		});

		//学校选择
		schoolSelect.init($('#schoolText'),$('#gj'),$('#sf'),$('#list'),$('#intersetText'),$('.interset-type'));

	}else if( url[url.length -1] === 'personCenterMessage' ){

		console.log( 'load personCenterMessage js' );

		//消息
		$.each($('.center-message').find('.title'),function(index,elem){

			$(elem).find('a').on('click',function(event){

				event.preventDefault();

				$(this).parents('tr').next().find('div').slideToggle();
			});
		});

		$('.check').on('click',function(){

			var $elem = $(this);
			var _id = $elem.prev().val();

			$.ajax({
				type:'post',
				url:'/reviseMessageStatus',
				data:'_id='+_id,
				success:function(){
					$elem.remove();
				}
			});
		});

	}else if( window.location.href.indexOf('personCenter') != -1 ){

		console.log( 'load personCenter js' );
		//个人中心-预约-hover

		$('.thumbnail').hover(function(e){

			e.stopPropagation();

			$(this).find('.mask-icon').animate({
				opacity:1,
				top:0
			},200);

		},function(e){
			e.stopPropagation();

			$(this).find('.mask-icon').animate({
				opacity:0,
				top:'-40px'
			},200);
		});
		
		
		//个人中心-预约-删除预约
		$('#apt-dele').on('click',function(){

			var _val = $(this).parents('.thumbnail').find('input[name="_id"]').val();
			
			$.ajax({
				url:'/removeAppointHouse',
				type:'post',
				data:'_id='+_val,
				success:function(msg){
					
					location.reload();
				},
				error:function(){

				}
			})
		});

		//个人中心 -- 预约 -- 跳转
		$('#trun-page').on('click',function(e){

			e.preventDefault();
			console.log('asdasdad');
			var page = $(this).prev().val(),all = $(this).prev().prev().val();

			if( page > all ){
				alert('超过总数,最多只有'+all);
			}else{
				window.location.href = 'personCenter?count='+page;
			}

		});

		//预约中心-- qqshare

		qqshare.init($('#qq-share'));
	}
});

function valiForm(ev){

	ev.preventDefault();

	console.log( ev.target );

	return false;
}
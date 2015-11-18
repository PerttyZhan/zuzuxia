define(["require","module","exports"],function(require,module,exports){

	var allunivlist = require('allunivlist');
	//学校选择
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
				$gj .append("<a href='javascript:void(0)' data-aid="+j+" data-name="+m.name+">"+m.name+"</a>");			
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
			

			$text.on('click',function(e){

				e.stopPropagation();
				$gj.show();
				$list.hide();
				$sf.hide();
			});
			$intersetText.on('focus',function(e){
				e.stopPropagation();
				$intersetContent.show();
			});

			$intersetText.on('change',function(){

				$intersetContent.hide();

			});
			$intersetContent.find('a').on('click',function(e){

				e.preventDefault();
				e.stopPropagation();
				$intersetText.val( $intersetText.val() + ',' + $(this).text() );
				$(this).parent().hide();

				$.ajax({
					url:'/updatePersonInfo',
					type:'post',
					data:'_id='+This._id+'&interset='+$intersetText.val(),
					success:function(msg){
					},
					error:function(){

					}
				});
			});

			$gj.delegate('a','click',function(e){
				e.stopPropagation();
				var aid = $(this).data('aid'),name = $(this).data('name');
				This.getSheng(aid,name);

			});
			$sf.delegate('a','click',function(e){
				e.stopPropagation();
				var gid = $(this).data('gid'),pid = $(this).data('pid'),name = $(this).data('name');

				This.getSchool(gid,pid,name);
			});
			$list.delegate('a','click',function(e){

				var school = This.school;
				e.preventDefault();
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
					$sf.append("<a href='javascript:void(0);'  data-gid="+aid+" data-pid="+j+" data-name="+m.name+" >"+m.name+"</a>");
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

	module.exports = schoolSelect;
})
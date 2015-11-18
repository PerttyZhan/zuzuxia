define(["require"],function(require){

	var schoolSelect = require('schoolSelect');    //学校选择

    var index = {
        init:function(){
            this.dataInit();    //数据缓存
            this.cpInit();      //组件初始化
            this.eventInit();   //事件初始化
        },
        dataInit:function(){

            typeof this.data == 'undefined'?this.data = {}:void(0);
            $.extend(this.data,{
                $dr:$('#dropRole'),
                $cb:$('#changeBg'),
                $gj:$('#gj'),
                $sf:$('#sf'),
                $list:$('#list'),
                $it:$('#intersetText'),
                $itc:$('.interset-type'),
                $pif:$('#personInfoFrom'),
                $_id:$('#_id'),
                $st:$('#schoolText')
            });
        },
        eventInit:function(){
            var $cb = this.data['$cb'],
                $dr = this.data['$dr'],
                $gj = this.data['$gj'],
                $sf = this.data['$sf'],
                $list = this.data['$list'],
                $itc = this.data['$itc'],
                $pif = this.data['$pif'],
                This = this;

            //背景的改变
            $cb.on('change',function(){
                $(this).parent().
                        submit();
            });

            /* 登录后的 */
            $dr.hover(function(e){
                e.stopPropagation();
                $(this).
                    addClass('active');
            },function(e){
                $(this).
                    removeClass('active');
            });

            //点击其它地方消失
             $(document).on('click',function(e){
                $gj.hide();
                $sf.hide();
                $list.hide();
                $itc.hide();
            });

            //输入内容的改变
            $pif.delegate('input','change',function(){

                var name = $(this).attr('name');
                    value = $(this).val();
                    _id = This.$_id;

                $.ajax({
                    url:'/updatePersonInfo',
                    type:'post',
                    data:'_id='+_id.val()+'&'+name+'='+value,
                    success:function(msg){
                    },
                    error:function(){
                    }
                });

            });
        },
        cpInit:function(){
            var $st = this.data['$st'],
                $gj = this.data['$gj'],
                $sf = this.data['$sf'],
                $list = this.data['$list'],
                $it = this.data['$it'],
                $itc = this.data['$itc'];

            schoolSelect.init($st,$gj,$sf,$list,$it,$itc);
        }
    };

    index.init();
})
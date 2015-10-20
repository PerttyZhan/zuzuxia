define(["require"],function(require){

	var allunivlist = require('allunivlist'),
		schoolSelect = require('schoolSelect'),
		bannerRun = require('bannerRun'), 	//bannerRun的组件;
		_id = $('#_id').val(),$error =$('#error') ,name,value;

	schoolSelect.init($('#schoolText'),$('#gj'),$('#sf'),$('#list'),$('#intersetText'),$('.interset-type'));
	var banner = new bannerRun( $('#banner'),function(){});

    $('#personInfoFrom').delegate('input','change',function(){

         name = $(this).attr('name');
         value = $(this).val();
        // if( ( name == 'telephone' || name == 'name') && value == '' ){
        //         $error.text('电话和姓名不能空').show();
        //         return $(this).focus();
        // }

        $.ajax({
                url:'/updatePersonInfo',
                type:'post',
                data:'_id='+_id+'&'+name+'='+value,
                success:function(msg){
                	$error.hide();
                },
                error:function(){

                }
        });
});
	/* 登录后的 */
	$('#dropRole').hover(function(e){
		e.stopPropagation();
		$(this).addClass('active');
	},function(e){
		
		$(this).removeClass('active');
	});
})
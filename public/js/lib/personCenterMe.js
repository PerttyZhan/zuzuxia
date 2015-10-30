define(["require"],function(require){

	var allunivlist = require('allunivlist'),
		schoolSelect = require('schoolSelect'),
		_id = $('#_id').val(),$error =$('#error') ,name,value;

	schoolSelect.init($('#schoolText'),$('#gj'),$('#sf'),$('#list'),$('#intersetText'),$('.interset-type'));

    $('#personInfoFrom').delegate('input','change',function(){

         name = $(this).attr('name');
         value = $(this).val();
         
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

    $('#changeBg').on('change',function(){

        alert('change');
        $(this).parent().submit();
    });

	/* 登录后的 */
	$('#dropRole').hover(function(e){
		e.stopPropagation();
		$(this).addClass('active');
	},function(e){
		
		$(this).removeClass('active');
	});
})
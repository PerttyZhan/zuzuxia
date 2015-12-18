define(["require","module","exports"],function(require,module,exports){

	var WdatePicker = require('WdatePicker');		//事件控件

	var clickList = {
		data:{
			$modalBody:$('#modal-body')
		},
		showModal:function(type,message){

			var modals = {
				'no-login':{
					$class:'message-no-login',
					$iclass:'icon-no-login',
					name:'$mnl'
				},
				'no-perfect':{
					$class:'message-no-perfect',
					$iclass:'icon-no-perfect',
					name:'$mnp'
				}
			},html,$modal;

			
			if( typeof this.data[modals[type].name] == 'undefined' ){

				html = '<div class="'+modals[type].$class+'">'+
							'<i class="icon '+modals[type].$iclass+'"></i>'+
							'<span >'+message+'</span>'+
						'</div>';

				$modal = this.data[modals[type].name] = $(html);
				this.data['$modalBody'].append($modal);
			}else{
				$modal = this.data[modals[type].name];
				$modal.find('span').text( message );
			}
			
			$modal.
				removeClass('fadeOutRight animated-fadeOUt').
				show().
				addClass('fadeInUp animated-login');
				
			return setTimeout(function(){
				$modal.removeClass('fadeInUp animated-login').addClass('fadeOutRight animated-fadeOUt');

			},1000);
			
		},
		isLogin:function(){
			return document.getElementById('dropMenu') != null;
		}(),
		valiType:{
			isNoEmpty:{
				validate:function(value){
					return value !== "";
				},
				instructions:"不能为空"
			},
			isEmail:{
				validate: function (value) {
			        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
			    },
			    instructions: "只能是email"
			},
			isPhone:{
				validate: function (value) {
			        return /^(1)\d{10}$/.test( value );
			    },
			    instructions: "只能是电话"
			},
			isPhOrEm:{
				validate:function(value){
					return this['isEmail'].validate(value) || this['isPhone'].validate(value);
				},
				instructions:'只能是电话和邮箱'
			},
			isChecked:{
				validate:function(value,$t){
					return $t.prop('checked');
				},
				instructions:'需要同意,请认真查看协议'
			},
			len10to20:{
				validate:function(value,$t){
					return (value.length >= 10 && value.length <=20);
				},
				instructions:'长度在10到20位'
			},
			less10:{
				validate:function(value,$t){
					return (value.length <= 10);
				},
				instructions:'长度小于10位'
			}
		},
		valiForm:function(config){
			var $pt = config['$pt'],
				$err = config['$err'],
				$text = $pt.find('input,select'),
				This = this,data = {},oNow;
		
			for( var i = 0,len = $text.length;i<len;i++ ){
				oNow = $text.eq(i);
				if( !vali( oNow ) ){
					return false;
				}
				data[ oNow.attr('name') ] = oNow.val();
			}
			function vali($t){
				var vt = !!$t.data('vali')?$t.data('vali').split(','):[],
					type,ph = $t.attr('placeholder');

				for( var i = 0 ,len = vt.length;i<len;i++ ){
					type = This.valiType[ vt[i] ];
					if( !!type ){
						if( !type.validate.call( This.valiType,$t.val(),$t ) ){
							showErr( ph + type.instructions );
							return false;
						}else{
							!!$err?$err.hide().text(''):void 0;
						}
					}
				}
				return true;
			}
			function showErr(message){
				return !!$err?$err.show().text( message ):This.showModal( 'no-perfect',message);
			}

			data['time'] = new Date().getTime();
			return data;
		}	
	};

	module.exports = clickList;
})
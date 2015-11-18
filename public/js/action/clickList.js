define(["require","module","exports"],function(require,module,exports){

	var WdatePicker = require('WdatePicker');		//事件控件

	var clickList = {
		data:{
			$modalBody:$('#modal-body')
		},
		valiType:function( val ){
			var reg_phone = /^1\d{10}$/;
			var reg_email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
			if( reg_phone.test( val ) ){
				return '电话';
			}else if( reg_email.test( val ) ){
				return '邮箱';
			}else{
				return '其它';
			}
		},
		valiNull:function($obj){

			var $form = $obj.parents( 'form' ),
				$text = $form.find('input'),
				$error = $form.find('.error:eq(0)'),
				pld,j={},key,val,$this,type;

			for( var i=0,max=$text.length;i<max;i++ ){

				$this = $text.eq(i);
				type = $this.attr('type');
				key = $this.attr('name');
				val = $this.val();
				pld = $this.attr('placeholder');
				j[key] = val;

				if( $this.data('require') == 'no' ){
					continue;
				}
				switch(type){
					case 'checkbox':
						if( !$this.prop('checked') ){
							$error.show().html( pld+'不能为空' );
							return false;
						}
						break;
					case 'hidden':
						break;
					default:
						if( val == '' ){
							console.log( $error );
							$error.show().html( pld+'不能为空' );
							return false;
						}
				}
				
			}
			j['time'] = new Date().getTime();
			return j;
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
			}else{
				$modal = this.data[modals[type].name];
			}

			this.data['$modalBody'].append($modal);
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
		validator:{
			// 所有可以的验证规则处理类存放的地方，后面会单独定义
			types:{},
			// 验证类型所对应的错误消息
			message:{},
			// 当然需要使用的验证类型
			config:{},
			valid:function($obj){

				var $form = $obj.parents( 'form' ),
				$text = $form.find('input'),
				$error = $form.find('.error:eq(0)'),
				pld,j={},key,val,$this,type;

				for( var i=0,max=$text.length;i<max;i++ ){

					if( !this.validate($text.eq(i)) ){

						$error.show().html( this.messages.msg );
						return false;
					}
				}
			},
			validate:function($j){

				var data = $j.data('valiconfig').split(','), msg, type, checker, result_ok;

				for( var i=0,max=data.length;i<max;i++ ){

					type = this.config[data[i]];			// 根据key查询是否有存在的验证规则
					checker = this.types[type];		// 获取验证规则的验证类

					if( !type ){					
						continue;					// 如果验证规则不存在，则不处理
					}			
					if( !checker ){					// 如果验证规则类不存在，抛出异常
						throw {
	                        name: "ValidationError",
	                        message: "No handler to validate type " + type
	                    };
					}

					result_ok = checker.validate( $j.val() );	// 使用查到到的单个验证类进行验证

					if( !result_ok ){
						msg = "Invalid value for *" + i + "*, " + checker.instructions;
                		this.messages = {
                			obj:$j,
                			msg:checker.instructions
                		};
                		return false;
					}
				}

				return true;
			}
		}

	};

	// 验证给定的值是否不为空
	clickList.validator.types.isNoEmpty = {
		validate:function(value){
			return value !== "";
		},
		instructions:"不能为空"
	};

	// 验证给定的值是否是数字
	clickList.validator.types.isNumber = {
		validate:function(value){
			return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},
		instructions: "只能是合法的数字，例如：1, 3.14 or 2010"
	};

	// 验证给定的值是否只是字母或数字
	clickList.validator.types.isAlphaNum = {
	    validate: function (value) {
	        return !/[^a-z0-9]/i.test(value);
	    },
	    instructions: "只能保护字母和数字，不能包含特殊字符"
	};
	// 验证给定的值是否url
	clickList.validator.types.isUrl = {
	    validate: function (value) {
	        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
	    },
	    instructions: "只能是url"
	};
	// 验证给定的值是否url
	clickList.validator.types.isEmail = {
	    validate: function (value) {
	        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
	    },
	    instructions: "只能是email"
	};

	module.exports = clickList;
})
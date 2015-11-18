define(["require","module","exports"],function(require,module,exports){

	//点击事件的集合

	var clickList = {
		'alive-input':function($this){
			$this.data('val',$this.val());	
		}
	};
	module.exports = clickList;
})
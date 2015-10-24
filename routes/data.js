function format(){

	var date = new Date(),
		y = date.getFullYear(),
		M = date.getMonth() + 1,
		d = date.getDate(),
		h = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds();

		m = m > 10 ? m : '0'+m;
		s = s > 10 ? s : '0'+s;

	return '' + y + M + d + h + m + s;
}

var b = new Buffer( format() );

console.log( format() );


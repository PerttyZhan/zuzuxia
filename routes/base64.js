

console.log( new Date('yyyyMMddHHmmss') );
var b = new Buffer('asdasdasdsa'+new Date());
var s = b.toString('base64');

console.log(s);


var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'http://www.soho3q.com';
var rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g,arr = [],$,$img;

request(url,function(error,res,body){

	if( !error && res.statusCode == 200 ){

		$ = cheerio.load(body),$img = $('img');

		for( var i=0,max=$img.length;i<max;i++ ){

			arr.push( $img[i].attribs.src );
		}

		 console.log( arr );
		for( var i = 0,max=arr.length;i<max;i++ ){

			request(url+arr[i]).pipe(fs.createWriteStream( i+'.png' ));

		}
			
	}
})
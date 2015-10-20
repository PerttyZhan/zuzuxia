

var Q = require('q');
var fs = require('fs');

var preadFile = function(file,encoding){

	var deferred = Q.defer();

    fs.readFile('test.txt',function(err,data){

    	console.log(data);
        if(!err){
        	console.log('1');
            deferred.resolve(data);
        }else{
            deferred.reject(err);
        }
    });

    return deferred.promise;
};


preadFile().then(function(data){
	console.log( data );
});
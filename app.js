
var settings = require('./settings');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
// var template = require('art-template');
var laytpl = require('laytpl');
var route = require('./routes/index');
var app = express();
var flash = require('connect-flash');
var connect = require('connect');

// template.config('base', '');
// template.config('extname', '.html');
// template.config('encoding', 'utf-8');
laytpl.config({
    open: '{{',
    close: '}}',
    cache:false
});

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var port = process.env.PORT || settings.DB.port;

//all environments

app.set('views',__dirname+'/views/');
app.engine('.html',laytpl.__express);
app.set('view engine','html');

//uncomment after placing you favicon in /public

app.use(favicon(__dirname + '/public/image/bitbug_favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(session({
	secret:'keyboard cat',
	name:'zuzuxia',
	resave:false,
	saveUninitialized: true,
	cookie:{maxAge:1000 * 60 * 60 * 24 * 30},
	store: new MongoStore({
		url:'mongodb://zhanheng:123456@localhost/zuzuxia'
	})
}));

app.use(flash());
app.use(express.static(path.join(__dirname,'public/')));

app.listen(port,function(){
	console.log('Express server listening on port ' + port);
});

route(app);





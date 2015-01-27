/*jslint white: true, devel: true, nomen:true*/
/*global require, __dirname*/
var express	= require('express'),
	http	= require('http'),
	path	= require('path'),
	mysql	= require('mysql'),
	app		= express(),
	connection	= mysql.createConnection({
		host	: 'localhost',
		user	: 'root',
		password: ''
	}),
	handlebars		= require('express-handlebars'),
	homeController	= new (require('./controllers/homeController'));

app.engine('html', handlebars({extname: 'html', defaultLayout: 'main.html'}));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', homeController.run);

app.get('/test', function( req, res, next ){
	'use strict';
	//testController.run( req, res, next );
});

http.createServer( app ).listen(3000, function(){
	'use strict';
	console.log('listen');
});
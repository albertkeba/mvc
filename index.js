/*jslint white: true, devel: true, nomen:true*/
/*global require, __dirname*/
/*https://github.com/stevekwan/best-practices/blob/master/javascript/best-practices.md*/
var express	= require('express'),
	http	= require('http'),
	path	= require('path'),
	mysql	= require('mysql'),
	url		= require('url'),
	app		= express(),
	fs		= require('fs'),
	connection	= mysql.createConnection({
		host	: 'localhost',
		user	: 'root',
		password: ''
	}),
	handlebars		= require('express-handlebars'),
	routes = [];

app.engine('html', handlebars({extname: 'html', defaultLayout: 'main.html'}));
app.set('view engine', 'html');

app.use( express.static(path.join(__dirname, 'public')) );

//app.get('/', homeController.run);

fs.readdirSync('./controllers').forEach(function( file ){
	'use strict';
	if ( file.substr(-3) === '.js' )
	{
		routes[file.slice(0,-3)] = require( './controllers/' + file );
	}
});


app.all('/:controller?/:method?/:params?',function( req, res, next ){
	'use strict';

	var c = req.params.controller,
		m = req.params.method;
	
	if ( routes.hasOwnProperty(c+'Controller') )
	{
		new (routes[c+'Controller'])().run( req, res, next, m );
	}
	else
	{
		res.send('Hello World!');
	}
	
});

http.createServer( app ).listen(3000);
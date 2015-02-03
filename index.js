/*jslint white: true, devel: true, nomen:true*/
/*global require, __dirname*/
//https://www.npmjs.com/package/browserify-handlebars
var express	= require('express'),
	http	= require('http'),
	path	= require('path'),
	url		= require('url'),
	app		= express(),
	fs		= require('fs'),
	routes	= [],
	handlebars	= require('express-handlebars');

app
	.engine('html', handlebars({extname: 'html', defaultLayout: 'main.html'}))
	.set('view engine', 'html')
	.use( express.static(path.join(__dirname, 'public')) );

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
		m = req.params.method,
		p = req.params.params;
	
	if ( routes.hasOwnProperty(c+'Controller') )
	{
		new (routes[c+'Controller'])().run( req, res, next, m, p );
	}
	else
	{
		res.send('Hello World!');
	}
	
});

app.listen(3000);
/*jslint white: true, devel: true, nomen:true*/
/*global require, __dirname*/
//https://www.npmjs.com/package/browserify-handlebars
var express	= require('express'),
	http	= require('http'),
	path	= require('path'),
	url		= require('url'),
	body	= require('body-parser'),
	app		= express(),
	fs		= require('fs'),
	routes	= [],
	handlebars	= require('express-handlebars'),
	parseUrlEncoded = body.urlencoded({extended: false});


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


app.all('/:controller?/:method?/:params?', parseUrlEncoded, function( req, res, next ){
	'use strict';

	var c = req.params.controller ? (req.params.controller).toLowerCase() : null,
		m = req.params.method ? (req.params.method).toLowerCase() : null,
		p = req.params.params ? (req.params.params).toLowerCase() : null;
	
	if ( c )
	{
		if ( routes.hasOwnProperty(c+'Controller') )
		{
			new (routes[c+'Controller'])().run( req, res, next, m, p );
		}
		else
		{
			res.status(404).json('404 Not found');
		}
	}
	else
	{
		new (routes.usersController)().run( req, res, next, m, p );
	}
	
});

app.listen(3000);
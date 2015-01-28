/*jslint white: true, devel: true, nomen:true*/
/*global require, __dirname*/
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
	//homeController	= new (require('./controllers/homeController'))(),
	route;

app.engine('html', handlebars({extname: 'html', defaultLayout: 'main.html'}));
app.set('view engine', 'html');

app.use( express.static(path.join(__dirname, 'public')) );

/*app.get('/', homeController.run);

app.get('/test', function( req, res, next ){
	'use strict';
	//testController.run( req, res, next );
});*/

/*fs.readdirSync('./controllers').forEach(function( file ){
	'use strict';
	if ( file.substr(-3) === '.js' )
	{
		route = require( './controllers/' + file );
		route.controller( app );
	}
});*/

app.all('/:cnt(/:meth)',function( req, res, next ){
	'use strict';
	var urlParts = url.parse( req.url, true );
	console.log(urlParts,req.params);
	 res.send('Hello World!');
});

http.createServer( app ).listen(3000, function(){
	'use strict';
	console.log('listen');
});
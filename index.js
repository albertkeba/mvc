/*jslint white: true, devel: true, nomen:true*/
/*global require, __dirname*/
/*http://runnable.com/U07z_Y_j9rZk1tTx/handlebars-template-examples-with-express-4-for-node-js*/
var express	= require('express'),
	http	= require('http'),
	path	= require('path'),
	app		= express(),
	handlebars		= require('express-handlebars'),
	homeController	= require('./controllers/home');

app.engine('html', handlebars({extname: 'html', defaultLayout: 'main.html'}));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', homeController.run);

http.createServer( app ).listen(3000, function(){
	'use strict';
	console.log('listen');
});
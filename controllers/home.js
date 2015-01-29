/*jslint white: true, devel: true*/
/*global require, module*/
var Controller = require('../system/core/controller');

module.exports.controller = function( app ){
	'use strict';
	
	app.get('/test', function(req,res,next){
		res.send('Hello World! homejs');
	});
};
/*jslint white: true, devel: true*/
/*global require, module*/
var Controller = require('../system/core/controller'),
	UserModel = require('../models/test');

module.exports = (function(){
	'use strict';
	
	var _name	= 'Home',
		_content= null;
	
	function HomeController(){}
	
	HomeController.prototype = Object.create( Controller.prototype );
		
	HomeController.prototype.index = function( req, res, next ){
		res.render('home', {title: 'Repertoire de contacts'});
	};
	
	HomeController.prototype.test = function( req, res, next ){
		res.send('Test fn!');
	};
	
	HomeController.prototype.check = function( req, res, next ){
		res.send('Check fn!');
	};
	
	HomeController.prototype.users = function( req, res, next ){
		var u = new UserModel().getUsers();
		
		res.send('users fn!');
	};
	
	return HomeController;
}());
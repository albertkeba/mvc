/*jslint white: true, devel: true*/
/*global require, module*/

var Controller = require('../system/core/controller');

module.exports = (function(){
	'use strict';
	
	function LoginController(){}
	
	LoginController.prototype = Object.create( Controller.prototype );
	
    return LoginController;
}());
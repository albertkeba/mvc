/*global require, module*/
var BaseModel = require('../system/core/model');

module.exports = (function(){
	'use strict';
	
	function Test(){}
	
	Test.prototype = Object.create( BaseModel.prototype );
	
	Test.prototype.getUsers = function(){
		var qr = "SELECT * FROM employees",
			rs = this.select(qr);
	};
	
	return Test;
}());	
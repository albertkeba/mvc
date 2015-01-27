/*global require, module*/
var BaseModel = require('../system/core/model');

module.exports = (function(){
	'use strict';
	
	function Test(){}
	
	Test.prototype = Object.create( BaseModel.prototype );
	
	return Test;
}());	
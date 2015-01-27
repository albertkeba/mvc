/*jslint devel: true*/
/*global module*/
module.exports = (function(){
	'use strict';
	var _db = null;
	
	function Model( db ){
		this._db = db;
	}
	
	Model.prototype.setDB = function(){
		console.log('setDB');
	};
	
	return Model;
}());
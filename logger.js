/*global module, process*/
module.exports = function( req, res, next ){
	'use strict';
	var start	= +new Date(),
		stream	= process.stdout,
		url		= req.url,
		method	= req.method;
	
	res.on('finish', function(){
		var duration= +new Date() - start,
			message	= method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
		
		stream.write( message );
	});
	
	next();
};
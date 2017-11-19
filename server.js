 var Hapi = require('hapi');

 var server = new Hapi.Server();

 server.connection({
 	host: 'localhost',
 	port: 1337
 });

 server.route({
 	method: 'GET',
 	path: '/hello',
 	handler: function(request, reply) {
 		reply('hello World!');
 	}
 });

 server.start(function(){
 	console.log('Server running at:', server.info.uri);
 });
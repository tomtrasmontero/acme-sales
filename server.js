const http = require('http');
const server = http.createServer(require('./app'));
const models = require('./models/index.js');
const Region = models.Region;
const SalesPerson = models.SalesPerson;
const SalesPersonRegion = models.SalesPersonRegion;

//sync up database before starting up the server
Region.sync({})//force:true
.then(function(){
	return SalesPerson.sync({});
})
.then(function(){
	return SalesPersonRegion.sync({});
})
.then(function(){
	server.listen(process.env.PORT, function(){
		console.log('You are listening on port ' + process.env.PORT)	
	})
})
.catch(function(err){
	console.log(err);
});
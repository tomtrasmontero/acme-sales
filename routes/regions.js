const router = require('express').Router();
const model = require('../models/index.js');
const Promise = require('bluebird');


//export router for app.js to use
module.exports = router;

router.get('/',function(req,res,next){
	model.listAllPersonRegion()
	.spread(function(salesPersons,regions,salesPersonRegion){
		res.render('regions', {regions: regions, users: salesPersons});
	})
	.catch(next);
});

router.post('/', function(req,res,next){
	model.Region.addRegion(req.body.zipcode)
	.then(function(result){
		res.redirect('/Regions');
	})
	.catch(next);
})

router.use(function(err,req,res,next){
	console.log('oh noes!!!!!!!!!!!');
	console.log(err, err.stack);
});
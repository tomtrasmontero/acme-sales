const router = require('express').Router();
const model = require('../models/index.js');
const Promise = require('bluebird');

//export router for app.js to use
module.exports = router;

router.get('/',function(req,res,next){
	model.listAllPersonRegion()
	.spread(function(salesPerson,regions,salesPersonRegion){
		// var salesRegArr = model.salesRegionArray(salesPersonRegion);
		res.render('salesPeople',{users:salesPerson, regions:regions, arr: salesPersonRegion, test: model.salesRegionTest});		
	})
	.catch(next);
});

router.post('/',function(req,res,next){
	model.SalesPerson.addPerson(req.body.name)
	.then(function(result){
		res.redirect('/SalesPeople');		
	})
	.catch(next);
});

router.delete('/:personId', function(req,res,next){
	model.SalesPerson.deletePerson(req.params.personId)
	.then(function(result){
		res.redirect('/SalesPeople');
	})
	.catch(next);
})

router.use(function(err, req, res, next){
	console.log("oh noes!!!!!!!!!!!!");
	console.log(err, err.stack);
});
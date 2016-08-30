const router = require('express').Router();
const model = require('../models/index.js');
const Promise= require('bluebird');

//export router for app.js to use
module.exports = router;

router.post('/:salesId/:regionId', function(req,res,next){
	model.SalesPersonRegion.addSalesAndRegion(req.params.salesId,req.params.regionId)
	.then(function(result){
		// button name = 'name'  and value on button is either sales or region
		res.redirect(req.body.name)
	})
	.catch(next);
});

router.delete('/:salesId/:regionId', function(req,res,next){
	model.SalesPersonRegion.deleteSalesAndRegion(req.params.salesId,req.params.regionId)
	.then(function(result){
		res.redirect(req.body.name)
	})
	.catch(next);
})

router.use(function(err, req, res, next){
	console.log("oh noes!!!!!!!!!!!!");
	console.log(err, err.stack);
});
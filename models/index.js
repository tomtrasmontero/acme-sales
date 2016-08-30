//requrie to access the orm and in turn will access database
const Sequelize = require('sequelize');
//create new connection to database
const db = new Sequelize('postgres://localhost:5432/acme_sales',{
	//set logging to false to not show any transaction between database
	logging: false
});
//require bluebird to use Promise.all and pass that to app.js to a .spread
const Promise = require('bluebird');

//function list
const listAllPersonRegion = function(){
	return Promise.all([SalesPerson.findAll({}), Region.findAll({}), SalesPersonRegion.listSalesAndRegion()]);
}

// grab the SalesPersonRegion and forms an array 
const salesRegionTest = function(arr, salesId,regionId){
	let test = false;
	let salesRegion = [];

	arr.forEach(function(array){
		salesRegion.push([array.dataValues.salespersonId,array.dataValues.regionId]);
	})

	salesRegion.filter(function(arr){
		if(arr[0] === salesId && arr[1] === regionId){
			test = true;
		}
	})

	return test;
};

const SalesPerson = db.define('salesperson',{
	name: Sequelize.STRING
},{
	classMethods:{
		addPerson:function(name){
			return SalesPerson.findOrCreate({
				where:{
					name: name					
				}
			})
		},
		deletePerson: function(id){
			return SalesPerson.findOne({
				where:{
					id: id
				}
			})
			.then(function(result){
				result.destroy();
			})
		}
	}
});

const Region = db.define('region',{
	zipcode: Sequelize.STRING
},{
	classMethods:{
		addRegion: function(zip){
			return Region.findOrCreate({
				where:{
					zipcode: zip	
				}
			})
		},
		deleteRegion: function(id){}
	}
});


const SalesPersonRegion = db.define('salespersonregion',{	
},{
	classMethods:{
		addSalesAndRegion: function(salesId,regionId){
			return SalesPersonRegion.findOrCreate({
				where:{
					salespersonId: salesId,
					regionId: regionId	
				}
			})
		},
		listSalesAndRegion: function(){
			return SalesPersonRegion.findAll({
				attributes: ['salespersonId','regionId']
			})
		},
		deleteSalesAndRegion: function(salesId,regionId){
			return SalesPersonRegion.findOne({
				where:{
					salespersonId: salesId,
					regionId: regionId
				}
			})
			.then(function(result){
				result.destroy();
			})
		}
	}
});

// write relationship here
SalesPerson.hasMany(SalesPersonRegion);
Region.hasMany(SalesPersonRegion);
//the below relationship allows the region have multiple salesperson and vice versa
SalesPersonRegion.belongsTo(Region);
SalesPersonRegion.belongsTo(SalesPerson);

module.exports = {
	SalesPerson: SalesPerson,
	Region: Region,
	SalesPersonRegion: SalesPersonRegion,
	listAllPersonRegion: listAllPersonRegion,
	salesRegionTest: salesRegionTest
}
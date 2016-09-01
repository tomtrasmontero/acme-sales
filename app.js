const express = require('express');
const app = express();
const swig = require('swig');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const model = require('./models/index.js');

const routeRegion = require('./routes/regions.js');
const routeSalesPeople = require('./routes/salesPeople.js');
const routeSalesPeopleRegion = require('./routes/salesPersonRegion.js');


//setup engine to render file and set views
swig.setDefaults({ cache:false});
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

//use express.static to serve up needed files
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'views')));

//use body parser
app.use(bodyParser.urlencoded({ extended: true}));

//use methodOveride for delete
app.use(methodOverride('_method'));

//export app to server.js
module.exports = app

//set up home route
app.get('/', function(req,res,next){
	res.render("home",{homeTab: "active"});
});


//set up routes here
app.use('/Regions/',routeRegion);
app.use('/SalesPeople/', routeSalesPeople);
app.use('/SalesPeopleRegion/', routeSalesPeopleRegion);

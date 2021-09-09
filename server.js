//packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Imports of Routes
const employeeRouter = require('./routes/employeeRouter');


//Setting up of the view engine i.e. hbs
app.use(methodOverride('_method'));

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'/views'));
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}));


//DB connection
mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser:true, useUnifiedTopology:true })
.then(() => console.log('Connection Successfull'))
.catch((err) => console.log('Error in DB connection :'+ err));


//Routes Declaration
app.use('/', employeeRouter);


//Server Declaration
app.listen(3000, () => {
    console.log('Express server started at port: 3000');
});
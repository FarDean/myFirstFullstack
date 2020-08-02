if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


// basic express setup
const express = require('express');
const app = express();
// import the router
const indexRouter = require("./routes/index");

const expressLayout = require('express-ejs-layouts');


app.use(expressLayout);
// setup the view engine:
app.set('view engine', 'ejs');
// A directory or an array of directories for the application's views. If an array, the views are looked up in the order they occur in the array.
app.set('views', __dirname + '/views'); 
// set the main layout file: all the files of app are going into the layout file
app.set('layout', 'layouts/layout');
// set the public folder
app.use(express.static('public'));
// use the imported router
app.use('/',indexRouter)
// database config
const mongoose = require('mongoose');
// database connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
// check if connectd to a db or not
const db = mongoose.connection
db.on('error', error=> console.error(error));
db.once('open',()=> console.log('connected to Mongoose'))
// basic express setup
app.listen(process.env.PORT || 3000);
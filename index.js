//install and import express
const express = require('express');
const path = require('path');

//set localhost:8000
const port = process.env.PORT || 8000
//install and configure mongoDB
const db = require('./config/mongoose');
const tasks = require('./models/tasks');

//Use express app to setup view engine, router, etc
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static(__dirname + '/assets'));

const routers = require('./routers/route.js');
app.use(routers);

//Run the server
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


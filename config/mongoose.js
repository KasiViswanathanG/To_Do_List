
//access and connect to mongo database
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://viswa:viswa@cluster0.fzs2q.mongodb.net/tasks_db?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', function(err) {
    console.log(err.message);
})

db.once('open', function(){
    console.log("Successfully connected to the database");
})
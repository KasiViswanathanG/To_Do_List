const mongoose = require('mongoose');

//create a model schema for database
const tasksSchema = new mongoose.Schema({
    task: {
        type : String,
        require : true
    },
    important: {
        type : Boolean,
        require : false
    },
    completed : {
        type : Boolean,
        require : false
    }
})

module.exports = mongoose.model('tasks',tasksSchema);
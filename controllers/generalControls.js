//import schema and express
const Tasks = require('../models/tasks');
const express = require('express');
const app = express();

//schema model
var tasksList = [{
    task : "task1",
    important : false,
    completed : false
}];

//Use express function to render home screen '/' 
exports.fetchTasks = ((req, res, next) => {
    Tasks.find({}, function(err, tasks){
        if(err){
            console.log("error in fetching tasks from database");
            return res.render('index', {
                tasksList : tasks,
                isError : true,
                msg : "Can't Fetch Tasks"
            })
        }
        console.log(tasks);
        return res.render('index', {
            tasksList : tasks,
            isError : false
        })
    })
})

//Use express function to create a task
exports.createTask = ((req, res, next) =>{
    Tasks.create({
        task: req.body.task,
        important : false,
        completed : false
    }, function(err, newTask){
        if(err){
            console.log("Error in creating a task!");
            return;
        }
        console.log("new task: ", newTask);
        return res.redirect('back');
    })
})

//Use express function to delete a task and return msg if important task is to be delted
exports.deleteTask = ((req, res, next) =>{
    let id = req.query.id;
    let importantOrNot = req.query.important;
    var response = {};
    if(importantOrNot == "true"){
        console.log("Important task can't be deleted");
        response["status"]="error"
        response["msg"]="Important task can't be deleted"
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
        return;
    }
    Tasks.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error in deleting the task");
            response["status"]="error"
            response["msg"]="error in deleting the task"
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
            return;
        }
        response["status"]="success"
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
        return;
    })
})


//Use express function to mark important task
exports.importantTask = ((req,res,next) =>{
    let id = req.query.id;
    let importantOrNot = req.query.important;
    let reverse = true;
    if(importantOrNot == "true"){
        reverse = false;
    }
    Tasks.findByIdAndUpdate(id,{important : reverse},function(err){
        if(err){
            console.log("error in marking important task");
            return;
        }
        return res.redirect('back');
    })
    
})

//Use express function to display important tasks
exports.displayImportantTasks = ((req, res, next) =>{
    Tasks.find({important : true}, function(err, tasks){
        if(err){
            console.log("error in fetching important tasks from database");
            return;
        }
        return res.render('index', {
            tasksList : tasks
        })
    })
})

//Use express function to mark completed task
exports.completedTask = ((req,res,next) =>{
    let id = req.query.id;
    let completedOrNot = req.query.complete;
    let reverse = true;
    if(completedOrNot == "true"){
        reverse = false;
    }
    Tasks.findByIdAndUpdate(id,{completed : reverse},function(err){
        if(err){
            console.log("error in marking important task");
            return;
        }
        return res.redirect('back');
    })
    
})

//Use experess function to display completed tasks
exports.displayCompletedTasks = ((req, res, next) =>{
    Tasks.find({completed : true}, function(err, tasks){
        if(err){
            console.log("error in fetching important tasks from database");
            return;
        }
        return res.render('index', {
            tasksList : tasks
        })
    })
})

//Use experess function to display uncompleted tasks
exports.displayUncompletedTasks = ((req, res, next) =>{
    Tasks.find({completed : false}, function(err, tasks){
        if(err){
            console.log("error in fetching important tasks from database");
            return;
        }
        return res.render('index', {
            tasksList : tasks
        })
    })
})

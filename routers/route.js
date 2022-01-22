//setup express and router
const express = require('express');
const app = express()
const router = express.Router();

//import controller access
const generalControls = require("../controllers/generalControls");

//use router to get and post functions from webpage to backend and vice versa
router.get('/', generalControls.fetchTasks);  
router.post('/create-task', generalControls.createTask);
router.get('/delete-task', generalControls.deleteTask);
router.get('/important-task', generalControls.importantTask);
router.get('/display-important-tasks', generalControls.displayImportantTasks);
router.get('/completed-task', generalControls.completedTask);
router.get('/display-completed-tasks', generalControls.displayCompletedTasks);
router.get('/display-uncompleted-tasks', generalControls.displayUncompletedTasks);

module.exports = router;
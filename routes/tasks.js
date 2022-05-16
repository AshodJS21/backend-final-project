const { Router } = require('express');
const Auth = require('../middlewares/auth');
const TaskController = require('../controllers/TaskController');
const async = require('../utils/async');
const validator = require('../validator');

const router = new Router();


//task det
router.get('/', Auth.user, async(TaskController.getTasks));

router.post('/', Auth.user, validator.createTask, async(TaskController.createTask));

router.patch('/:id', Auth.user, validator.updateTask, async(TaskController.updateTask));


//task-id and message

router.post('/:id/messages', Auth.user, async(TaskController.createMessage));

router.patch('/:id/messages/:messageId', Auth.user, async(TaskController.updateMessage));

module.exports = router
const { Router } = require('express');
const Auth = require('../middlewares/auth');
const UserController = require('../controllers/UserController');
const async = require('../utils/async');
const Validator = require('../validator');

const router = new Router();


router.get('/', Auth.user, async(UserController.getUsers));

router.get('/me', Auth.user, async(UserController.getMe));

router.get('/:id', Auth.user, async(UserController.getUser));

router.post('/', Auth.user, Validator.createUser, async(UserController.createUser));

router.patch('/:id', Auth.user, async(UserController.updateUser));

module.exports = router
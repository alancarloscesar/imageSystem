const router = require('express').Router();
const UserController = require('../src/controllers/UserController')

router.post('/user/create', UserController.store)

module.exports = router;
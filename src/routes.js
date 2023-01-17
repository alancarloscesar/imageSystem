const router = require('express').Router();
const UserController = require('../src/controllers/UserController')

router.get('/', (req, res) => res.send("Hello Word!"))
router.post('/user/create', UserController.store)

module.exports = router;
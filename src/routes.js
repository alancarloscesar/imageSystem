const router = require('express').Router();
const UserController = require('../src/controllers/UserController')


router.get('/', (req, res) => res.send("Hello Word!"))
router.post('/user/create', UserController.store)
router.delete('/user/delete/:name', UserController.destroy)
router.post("/auth", UserController.jwtTokenGenerate)

module.exports = router;
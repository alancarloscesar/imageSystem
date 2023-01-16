const User = require('../models/User')

class UserController {
    async store(req, res) {

        const { name, email, password } = req.body;

        const userCreate = await User.create({
            name,
            email,
            password
        })

        return res.json(userCreate)
    }
}

module.exports = new UserController();
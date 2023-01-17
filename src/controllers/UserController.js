const User = require('../models/User')
const bcrypt = require('bcrypt')

class UserController {
    async store(req, res) {

        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email: email })

        if (userExist) {
            res.status(400).json({
                Error: "Usuário já cadastrado"
            })
            return;
        }

        if (name === '' || email === '' || password === '') {
            res.status(400).json({
                Error: "Preencha todos os campos"
            })
            return;
        }

        //hash de senha}
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password, salt)

        const userCreate = await User.create({
            name,
            email,
            password: hash
        })

        return res.json(userCreate)
    }
}

module.exports = new UserController();
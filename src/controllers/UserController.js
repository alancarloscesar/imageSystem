const User = require('../models/User')
const bcrypt = require('bcrypt')

const jwt = require("jsonwebtoken")
const JWTSecret = "minhaaplicacao"

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

    async destroy(req, res) {
        const { name } = req.params
        await User.deleteMany({
            name
        })

        return res.status(200).json({
            Sucess: "Deletado..."
        });
    }

    async jwtTokenGenerate(req, res) {
        let { email, password } = req.body;

        let user = await User.findOne({
            email
        })

        //se não encontrar
        if (!user) {
            res.statusCode = 403;//o esperado pelo teste

            res.json({
                error: "Email não cadastrado."
            })

            return;
        }

        //comparando senhas
        let pass = await bcrypt.compare(password, user.password)

        if (!pass) {
            res.statusCode = 403;//o esperado pelo teste
            res.json({
                error: "Password não cadastrada"
            })
            return;
        }

        jwt.sign({ email, name: user.name, id: user._id }, JWTSecret, { expiresIn: '30d' }, (err, token) => {
            if (err) {
                res.sendStatus(500);
                console.log(err)
            } else {
                res.json({ token })
            }
        })
    }

}

module.exports = new UserController();
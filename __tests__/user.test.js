const supertest = require("supertest")
const app = require("../src/app")
let request = supertest(app)

describe("CADASTRO DE USUARIOS", () => {
    it("Deve cadastrar um usuário com sucesso!", () => {

        let emailCreate = Date.now();//criando um email aleatório
        let email = `${emailCreate}@gmail.com`

        let user = {//objeto user
            name: "Alan",
            email,
            password: "123123"
        }

        return request.post("/user").send(user)
        .then(res => {

            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(user.email !== '')
            expect(res.body.name).toEqual(user.name !== '')
            
        }).catch(err => {
            console.log(err)
        })
    })
})
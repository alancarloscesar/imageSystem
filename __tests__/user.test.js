const supertest = require("supertest")
const app = require("../src/app")
let request = supertest(app)

describe("CADASTRO DE USUARIOS", () => {
    it("Deve cadastrar um usuário com sucesso!", async () => {

        let emailCreate = Date.now();//criando um email aleatório
        let email = `${emailCreate}@gmail.com`

        let user = {//objeto user
            name: "Alan",
            email,
            password: "123123"
        }

        return request.post("/user/create").send(user)
            .then(res => {

                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(email)
                expect(res.body.name).toEqual(user.name)

            }).catch(err => {
                console.log(err)
            })
    })

    it('Deve impedir que a aplicação cadastre com campos vazios', async () => {
        let user = {
            name: '',
            email: '',
            password: ''
        }

        return request.post('/user/create').send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400)
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("Deve impedir que usuário com o mesmo email se cadastre", async () => {

        let emailCreate = Date.now();//criando um email aleatório
        let email = `${emailCreate}@gmail.com`

        let user = {//objeto user
            name: "Alan",
            email,
            password: "123123"
        }

        //deixa passar no primeiro e no segundo tem que dar 400 pq ja é o mesmo email
        return request.post("/user/create").send(user)
            .then(res => {

                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(email)

                return request.post("/user/create").send(user)
                    .then(res => {

                        expect(res.statusCode).toEqual(400);
                        expect(res.body.Error).toEqual("Usuário já cadastrado");

                    }).catch(err => {
                        console.log(err)
                    })

            }).catch(err => {
                console.log(err)
            })
    })
})
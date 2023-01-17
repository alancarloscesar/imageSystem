const supertest = require("supertest")
const app = require("../src/app")
let request = supertest(app)

let Mainuser = {//objeto user
    name: "Alan",
    email: "alan@alan.com",
    password: "123123"
}

beforeAll(async () => {
    return await request.post("/user/create").send(Mainuser)
        .then(res => { })
        .catch(err => console.log(err))
})

afterAll(async () => {//ao final de tudo vai deletar todos os registro com name Alan para não ficar no bd

    return await request.delete(`/user/delete/${Mainuser.name}`)
        .then(res => { })
        .catch(err => console.log(err))
})

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

describe("AUTENTICAÇÃO", () => {

    it("Deve retornar um token quando logar", async () => {
        return await request.post('/auth')
            .send({ email: Mainuser.email, password: Mainuser.password })
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.token).toBeDefined();//diferente de undefined
            })
            .catch(err => {
                fail(err)
            })
    })


    it("Deve impedir que um usuário não cadastrado se logue", async () => {
        return await request.post("/auth")
            .send({ email: "asdfasdf@asdfaf.com", password: "123456789" })
            .then(res => {
                expect(res.statusCode).toEqual(403)
                expect(res.body.error).toEqual("Email não cadastrado.")
            }).catch(err => {
                fail(err)
            })
    })

    it("Deve impedir que um usuário se logue com a senha incorreta", async () => {
        return await request.post("/auth")
            .send({ email: Mainuser.email, password: "123456789" })
            .then(res => {
                expect(res.statusCode).toEqual(403)
                expect(res.body.error).toEqual("Password não cadastrada")
            }).catch(err => {
                fail(err)
            })
    })
})
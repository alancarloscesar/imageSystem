const supertest = require("supertest")
const app = require("../src/app")
let request = supertest(app)

it("A aplicação deve responder na porta 3333", async () => {
    return request.get("/").then(res => {

        expect(res.statusCode).toEqual(200)
    }).catch(error => {
        fail(error);
    })
})
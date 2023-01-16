const supertest = require("supertest")
const app = require("../src/app")
let request = supertest(app)

it("A aplicação deve responder na porta 3333", () => {
    return request.get("/").then(res => {
        let status = res.statusCode;

        expect(status).toEqual(200)
    }).catch(error => {
        fail(error);
    })
})
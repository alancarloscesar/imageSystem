const express = require("express")
const cors = require("cors")
const router = require('./routes')
const mongoose = require("mongoose")

class App {
    constructor() {
        this.server = express();

        //conexao com mongodb

        mongoose.set("strictQuery", true);//desativando o warning do mongoosec

        mongoose.connect("mongodb://localhost:27017/imagesystem", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
           //console.log("Conectado com sucesso!")
        }).catch((error) => {
            console.log(error)
        })

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json())
        this.server.use(cors())
    }

    routes() {
        this.server.use(router)
    }
}

module.exports = new App().server
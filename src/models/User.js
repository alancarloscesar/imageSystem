
// const Schema = require('mongoose').Schema()
// const model = require('mongoose').model()
const {Schema, model} = require('mongoose')
//criando schema para a collection
const SchemaUser = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = model('User', SchemaUser)//exportando o schema com nome User...
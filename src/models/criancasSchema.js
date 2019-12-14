const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const criancasSchema = new Schema({

    _id: {type: mongoose.Schema.Types.ObjectId, auto: true, require: true},
    numCertidaoNasc: {type: Number,required: true, unique: true},
    nome: {type: String, required: true},
    apelido: {type: String},
    personalidade: {type: String},
    hobbies: { type: String },
    status: {type: String}

})


const criancasCollection = mongoose.model('criancas', criancasSchema);

module.exports = { criancasCollection };
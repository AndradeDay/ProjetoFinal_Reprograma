const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const criancasSchema = new Schema({

    _id: {type: mongoose.Schema.Types.ObjectId, auto: true, require: true}, 
    nome: {type: String, required: true}, 
    personalidade: {type: String}

})


const criancasCollection = mongoose.model('criancas', criancasSchema);

module.exports = { criancasCollection };

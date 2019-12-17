const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const cadastrosSchema = new Schema({

    _id: {type: mongoose.Schema.Types.ObjectId, auto: true, require: true},
    nome: {type: String, required: true}, 
    email: {type: String, required: true},
    senha:{type:String, required: true},
    grupo: {type: String}   
})


    
const cadastrosCollection = mongoose.model('cadastros', cadastrosSchema);

module.exports = { cadastrosCollection };
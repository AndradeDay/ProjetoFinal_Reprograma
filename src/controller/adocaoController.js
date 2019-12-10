const { connect } = require('../models/database')
const { criancasCollection }   = require('../models/criancasSchema')
//const bcrypt = require('bcryptjs')
connect ()


const addCrianca = (request, response) => {
    
    const infoDoBody = request.body
    const crianca = new criancasCollection(infoDoBody)

    crianca.save((error) => {


        if (error) {
            return response.status(400).send(error)
        } else {
            return response.status(201).send(crianca)
        }
    })

}


const mostrarCriancas = (request, response) => {
 criancasCollection.find((error, criancas) => {
     if(error){
         return response.status(500).sendo(error)
     } else{
         return response.status(200).send(criancas)
     }
 })
}


const deletar = (request, response) => {
    const idParams = request.params.id

    criancasCollection.findByIdAndDelete(idParams, (error, crianca) => {
        if(error){
            return response.Status(500).send(error)
        } else{
            return response.status(200).send('Cadastro deletado!')
        }
    })
}


module.exports =  { 
    addCrianca,
    mostrarCriancas, 
    deletar
} 
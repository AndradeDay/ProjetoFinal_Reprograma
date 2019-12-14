const { connect } = require('../models/database')
const { criancasCollection } = require('../models/criancasSchema')
const {cadastrosCollection}  = require('../models/cadastroSchema')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

connect()

// Rota para cadastrar usuarios e Hasherizar senha 

const cadastro =  (request, response) => {
    const criptografarSenha = bcrypt.hashSync(request.body.senha)
    request.body.senha = criptografarSenha
    const novoCadastro = new cadastrosCollection(request.body)

    novoCadastro.save((error) => {
        if (error) {
          return response.status(500).send(error)
        }
    
        return response.status(201).send(novoCadastro)
      })
    }
    





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
        if (error) {
            return response.status(500).sendo(error)
        } else {
            return response.status(200).send(criancas)
        }
    })
}


const deletar = (request, response) => {
    const idParams = request.params.id

    criancasCollection.findByIdAndDelete(idParams, (error, crianca) => {
        if (error) {
            return response.Status(500).send(error)
        } else {
            return response.status(200).send('Cadastro deletado!')
        }
    })
}


const update = (request, response) => {
    const idParams = request.params.id
    const infoDoBody = request.body
    const options = { new: true }

    criancasCollection.findByIdAndUpdate(idParams, infoDoBody, options, (error, crianca) => {
        if (error) {
            return response.status(500).send(error)
        }
        if (crianca) {
            return response.status(200).send(crianca)
        } else {
            return response.status(404).send('Criança não encontrada')
        }

    })
}



module.exports = {
    addCrianca,
    mostrarCriancas,
    deletar, 
    update,
    cadastro
} 
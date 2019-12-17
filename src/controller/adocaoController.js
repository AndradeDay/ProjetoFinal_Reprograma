const { connect } = require('../models/database')
const { criancasCollection } = require('../models/criancasSchema')
const { cadastrosCollection } = require('../models/cadastroSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const novoSchema = {}
connect()

const SEGREDO = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0lO48na+yjkDl/P53SmGmcVEel1kDXbzqCiPx7JUcfSHcUX+AXNk4HwoBBtzw0DEw/e1HEI2xOmLjk//VO7uwcg6xTKYTD3JYs9ZE2LN5tF3STeuxO624F6QQ3pmuoMiFP3a7jRmJzTOGa+HV3ERtftEirRVa7J9XC7zWYs9VywIDAQAB'

// Rota para cadastrar usuarios e Hasherizar senha 

const cadastroUser = (request, response) => {
    const criptografarSenha = bcrypt.hashSync(request.body.senha)
    request.body.senha = criptografarSenha
    request.body.grupo = 'user'
    const novoCadastro = new cadastrosCollection(request.body)


    novoCadastro.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }

        return response.status(201).send(novoCadastro)
    })
}


// rota para cadastrar com grupo ADMIN


const cadastroAdmin = (request, response) => {
 const criptografarSenha = bcrypt.hashSync(request.body.senha)
 request.body.senha = criptografarSenha
 request.body.grupo = 'admin'
 const novoCadastro = new cadastrosCollection(request.body)

 novoCadastro.save((error) => {
     if(error){
         return response.status(500).send(error)
     }
     return response.status(201).send(novoCadastro)
 })
}


const login = async (request, response) => {
    const cadastroEncontrado = await cadastrosCollection.findOne({ email: request.body.email })

    if (cadastroEncontrado) {
        const senhaCorreta = bcrypt.compareSync(request.body.senha, cadastroEncontrado.senha)

        if (senhaCorreta) {
            const token = jwt.sign(
                {
                    grupo: cadastroEncontrado.grupo
                },
                SEGREDO,
                { expiresIn: 6000 }
            )

            return response.status(200).send({ token })
        }

        return response.status(401).send('Senha incorreta.')
    }

    return response.status(404).send('Cadastro não encontrado.')


}



const mostrarCadastros = (request, response) => {
    cadastrosCollection.find((error, cadastros) => {
        if(error){
            return response.status(500).send(error)
        } else{
            return response.status(200).send(cadastros)
        }
    }) 
}

const deletarUser = (request, response) => {
    const idParams = request.params.id

    cadastrosCollection.findByIdAndDelete(idParams, (error, cadastro) => {
        if (error) {
            return response.Status(500).send(error)
        } if(cadastro) {
            return response.status(200).send('Cadastro deletado!')
        } else{
            return response.senha(404).send('cadastro não encontrado')
        }
    })
}


// rota para adicionar Crinaças 


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



const mostrarCriancasAdmin = (request, response) => {
    criancasCollection.find((error, criancas) => {
        if (error) {
            return response.status(500).sendo(error)
        } else {
            return response.status(200).send(criancas)
        }
    })
}



const criancasUser = (criancasCollection) => {

    novoSchema.nome = criancasCollection[0].nome,
        novoSchema.apeliddo = criancasCollection[0].apelido,
        novoSchema.personalidade = criancasCollection[0].personalidade,
        novoSchema.hobbies = criancasCollection[0].hobbies

    console.log(criancasCollection[0].nome)
    return novoSchema
}

const mostrarCriancasUser = (request, response) => {


    criancasCollection.find((error, novoSchema) => {

        if (error) {
            return response.status(500).send(error)
        } else {
            return response.status(200).send(criancasUser(novoSchema))
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
    cadastroUser,
    cadastroAdmin,
    mostrarCriancasAdmin,
    mostrarCriancasUser,
    mostrarCadastros,
    deletar,
    deletarUser,
    update,
    login
} 
const express = require('express')
const router = express.Router()
const controllerAdocao = require('../controller/adocaoController')
const jwt = require('jsonwebtoken')
//const bcrypt = require('bcryptjs')

const SEGREDO = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0lO48na+yjkDl/P53SmGmcVEel1kDXbzqCiPx7JUcfSHcUX+AXNk4HwoBBtzw0DEw/e1HEI2xOmLjk//VO7uwcg6xTKYTD3JYs9ZE2LN5tF3STeuxO624F6QQ3pmuoMiFP3a7jRmJzTOGa+HV3ERtftEirRVa7J9XC7zWYs9VywIDAQAB'


const autenticar = (request, response, next) => {
    const authHeader = request.get('authorization')
    let autenticado = false
  
    if (!authHeader) {
      return response.status(401).send('Você precisa fazer login!')
    }

    const token = authHeader.split(' ')[1]
  
    jwt.verify(token, SEGREDO, (error, decoded) => {
      if (error) {
        autenticado = false
      } else {
        if (decoded.grupo == 'user' || decoded.grupo == 'admin') {
          autenticado = true
        } else {
          autenticado = false
        }
      }
    })
  
    if (!autenticado) {
      return response.status(403).send('Acesso negado.')
    }
  
    next()
  }
  
  
  const autenticarAdmin = (request, response, next) => {
    const authHeader = request.get('authorization')
    let autenticado = false
  
    if (!authHeader) {
      return response.status(401).send('Você precisa fazer login!')
    }
  
    const token = authHeader.split(' ')[1]
  
    jwt.verify(token, SEGREDO, (error, decoded) => {
      if (error) {
        autenticado = false
      } else {
        if (decoded.grupo == 'admin') {
          autenticado = true
        } else {
          autenticado = false
        }
      }
    })
  
    if (!autenticado) {
      return response.status(403).send('Acesso negado.')
    }
  
    next()
  }

router.post('/adicionarCrianca', autenticarAdmin, controllerAdocao.addCrianca);
router.post('/cadastrarUser', controllerAdocao.cadastroUser);
router.post('/cadastrarAdmin', controllerAdocao.cadastroAdmin);
router.post('/login', controllerAdocao.login);
router.get('/criancas', autenticarAdmin, controllerAdocao.mostrarCriancasAdmin);
router.get('/criancasUser',autenticar, controllerAdocao.mostrarCriancasUser);
router.get('/cadastros', autenticarAdmin,controllerAdocao.mostrarCadastros);
router.delete('/deletar/:id', autenticarAdmin, controllerAdocao.deletar);
router.delete('/deletarCadastro/:id', autenticarAdmin, controllerAdocao.deletarCadastro);
router.patch('/atualizar/:id', autenticarAdmin, controllerAdocao.update);

module.exports = router
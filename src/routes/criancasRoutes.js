const express = require('express')
const router = express.Router()
const controller = require('../controller/adocaoController')


router.post('/adicionar', controller.addCrianca)
router.get('/criancas', controller.mostrarCriancas)
router.delete('/deletar/:id', controller.deletar)

module.exports = router
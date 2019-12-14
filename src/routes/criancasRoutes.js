const express = require('express')
const router = express.Router()
const controller = require('../controller/adocaoController')


router.post('/adicionar', controller.addCrianca);
router.post('/cadastrar', controller.cadastro);
router.get('/criancas', controller.mostrarCriancas);
router.delete('/deletar/:id', controller.deletar);
router.patch('/atualizar/:id', controller.update);

module.exports = router
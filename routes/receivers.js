const express = require('express');
const ReceiverController = require('../controllers/receiverController');

const router = express.Router();

// lista todos
router.get('/', ReceiverController.index);

// formulário de criação
router.get('/create', ReceiverController.createForm);

// cria novo
router.post('/', ReceiverController.create);

// mostrar um item
router.get('/:id', ReceiverController.show);

// formulário de edição
router.get('/:id/edit', ReceiverController.editForm);

// atualizar
router.post('/:id', ReceiverController.update);

// deletar
router.post('/:id/delete', ReceiverController.delete);

// adicionar saldo
router.post('/:id/add-balance', ReceiverController.addBalance);

module.exports = router;

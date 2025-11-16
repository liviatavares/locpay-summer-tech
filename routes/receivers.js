const express = require('express');
const ReceiverController = require('../controllers/receiverController');

const router = express.Router();

// Lista todos
router.get('/', ReceiverController.index);

// Formulário de criação
router.get('/create', ReceiverController.createForm);

// Cria novo
router.post('/', ReceiverController.create);

// Mostrar um item
router.get('/:id', ReceiverController.show);

// Formulário de edição
router.get('/:id/edit', ReceiverController.editForm);

// Atualiza
router.post('/:id', ReceiverController.update);

// Deletar
router.post('/:id/delete', ReceiverController.delete);

// Adicionar saldo
router.post('/:id/add-balance', ReceiverController.addBalance);

module.exports = router;

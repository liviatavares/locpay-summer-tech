const express = require('express');
const router = express.Router();
const OperationsController = require('../controllers/operationsController');

// Formulário para criar nova operação
router.get('/create', OperationsController.createForm);

// Criar operação
router.post('/', OperationsController.create);

// Mostrar operação
router.get('/:id', OperationsController.show);

// Confirmar operação
router.post('/:id/confirm', OperationsController.confirm);

module.exports = router;

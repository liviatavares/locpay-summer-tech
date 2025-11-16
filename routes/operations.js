const express = require('express');
const router = express.Router();
const OperationsController = require('../controllers/operationsController');

// formulário para criar nova operação
router.get('/create', OperationsController.createForm);

// criar operação
router.post('/', OperationsController.create);

// mostrar operação
router.get('/:id', OperationsController.show);

// confirmar operação
router.post('/:id/confirm', OperationsController.confirm);

module.exports = router;

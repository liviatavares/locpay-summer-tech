var express = require('express');
var router = express.Router();

// página inicial
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'LocPay API',
    welcomeMessage: 'Bem-vindo ao sistema de operações financeiras da LocPay!',
    links: [
      { name: 'Recebedores', url: '/receivers' },
      { name: 'Nova Operação', url: '/operations/create' }
    ]
  });
});

module.exports = router;

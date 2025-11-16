var express = require('express');
var router = express.Router();

// Página inicial
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'LocPay API', // título que aparece no <title>
    welcomeMessage: 'Bem-vindo ao sistema de operações financeiras da LocPay!',
    links: [
      { name: 'Recebedores', url: '/receivers' },
      { name: 'Nova Operação', url: '/operations/create' }
    ]
  });
});

module.exports = router;

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const path = require('path');

var indexRouter = require('./routes/index');
var receiversRoutes = require('./routes/receivers');
var operationsRoutes = require('./routes/operations');

const expressLayouts = require('express-ejs-layouts');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// VIEW ENGINE + LAYOUT
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layout'); // usa views/layout.ejs como padrão

// 🔥 Título padrão acessível em TODAS as views
app.use((req, res, next) => {
  res.locals.title = 'App';
  next();
});

// MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROTAS
app.use('/', indexRouter);
app.use('/receivers', receiversRoutes);
app.use('/operations', operationsRoutes);  // 👈 ADICIONADO

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));

module.exports = app;

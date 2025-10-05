<<<<<<< HEAD
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'CinePolis - Sistema de Gestión',
    message: 'Bienvenido al sistema de gestión de cines más moderno'
  });
});

module.exports = router;
=======
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
>>>>>>> a85e6e46d0bf25511e770fa5a313c264abf2072b

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'CinePolis - Sistema de Gestión',
    message: 'Bienvenido al sistema de gestión de cines más moderno'
  });
});

module.exports = router;
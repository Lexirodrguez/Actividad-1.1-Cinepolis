const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/SalaController');

const salaController = new SalaController();

// Rutas API
router.get('/api', (req, res) => salaController.listar(req, res));
router.get('/api/tipo/:tipo', (req, res) => salaController.obtenerPorTipo(req, res));
router.get('/api/:id', (req, res) => salaController.obtenerPorId(req, res));
router.post('/api', (req, res) => salaController.crear(req, res));
router.put('/api/:id', (req, res) => salaController.actualizar(req, res));
router.delete('/api/:id', (req, res) => salaController.eliminar(req, res));

// Rutas Vistas
router.get('/', (req, res) => salaController.vistaLista(req, res));

module.exports = router;
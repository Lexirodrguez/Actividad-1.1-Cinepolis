const express = require('express');
const router = express.Router();
const PeliculaController = require('../controllers/PeliculaController');

const peliculaController = new PeliculaController();

// Rutas API
router.get('/api', (req, res) => peliculaController.listar(req, res));
router.get('/api/ultimas/5', (req, res) => peliculaController.obtenerUltimas(req, res));
router.get('/api/:id', (req, res) => peliculaController.obtenerPorId(req, res));
router.post('/api', (req, res) => peliculaController.crear(req, res));
router.put('/api/:id', (req, res) => peliculaController.actualizar(req, res));
router.delete('/api/:id', (req, res) => peliculaController.eliminar(req, res));

// Rutas Vistas
router.get('/', (req, res) => peliculaController.vistaLista(req, res));
router.get('/:id', (req, res) => peliculaController.vistaDetalles(req, res));

module.exports = router;
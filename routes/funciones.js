const express = require('express');
const router = express.Router();
const PeliculaController = require('../controllers/peliculasController');
const SalaController = require('../controllers/SalaController');
const FuncionController = require('../controllers/FuncionController');

const peliculaController = new PeliculaController();
const salaController = new SalaController();
const funcionController = new FuncionController(peliculaController, salaController);

// Rutas API
router.get('/api', (req, res) => funcionController.listar(req, res));
router.get('/api/fecha/:fechaInicio/:fechaFin', (req, res) => funcionController.obtenerPorRangoFechas(req, res));
router.get('/api/:id', (req, res) => funcionController.obtenerPorId(req, res));
router.post('/api', (req, res) => funcionController.crear(req, res));
router.put('/api/:id', (req, res) => funcionController.actualizar(req, res));
router.delete('/api/:id', (req, res) => funcionController.eliminar(req, res));
router.delete('/api/:funcionId/relacion', (req, res) => funcionController.eliminarRelacion(req, res));

// Rutas Vistas
router.get('/', (req, res) => funcionController.vistaLista(req, res));

module.exports = router;
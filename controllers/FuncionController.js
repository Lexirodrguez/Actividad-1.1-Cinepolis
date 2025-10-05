class FuncionController {
    constructor(peliculaController, salaController) {
        this.peliculaController = peliculaController;
        this.salaController = salaController;
        
        this.funciones = [
            {
                id: 1,
                peliculaId: 1,
                salaId: 1,
                fecha: '2024-01-15',
                hora: '18:00',
                precio: 250,
                asientosDisponibles: 150
            },
            {
                id: 2,
                peliculaId: 2,
                salaId: 2,
                fecha: '2024-01-15',
                hora: '20:00',
                precio: 300,
                asientosDisponibles: 120
            }
        ];
        this.nextId = 3;
    }

    listar(req, res) {
        const funcionesCompletas = this.funciones.map(funcion => ({
            ...funcion,
            pelicula: this.peliculaController.peliculas.find(p => p.id === funcion.peliculaId),
            sala: this.salaController.salas.find(s => s.id === funcion.salaId)
        }));
        
        res.json(funcionesCompletas);
    }

    obtenerPorId(req, res) {
        const id = parseInt(req.params.id);
        const funcion = this.funciones.find(f => f.id === id);
        
        if (!funcion) {
            return res.status(404).json({ error: 'Función no encontrada' });
        }

        const funcionCompleta = {
            ...funcion,
            pelicula: this.peliculaController.peliculas.find(p => p.id === funcion.peliculaId),
            sala: this.salaController.salas.find(s => s.id === funcion.salaId)
        };
        
        res.json(funcionCompleta);
    }

    crear(req, res) {
        const { peliculaId, salaId, fecha, hora, precio } = req.body;
        
        if (!peliculaId || !salaId || !fecha || !hora || !precio) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const pelicula = this.peliculaController.peliculas.find(p => p.id === parseInt(peliculaId));
        const sala = this.salaController.salas.find(s => s.id === parseInt(salaId));

        if (!pelicula) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        if (!sala) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }

        const nuevaFuncion = {
            id: this.nextId++,
            peliculaId: parseInt(peliculaId),
            salaId: parseInt(salaId),
            fecha,
            hora,
            precio: parseFloat(precio),
            asientosDisponibles: sala.capacidad
        };

        this.funciones.push(nuevaFuncion);
        res.status(201).json(nuevaFuncion);
    }

    actualizar(req, res) {
        const id = parseInt(req.params.id);
        const funcionIndex = this.funciones.findIndex(f => f.id === id);
        
        if (funcionIndex === -1) {
            return res.status(404).json({ error: 'Función no encontrada' });
        }

        const { fecha, hora, precio, asientosDisponibles } = req.body;
        
        this.funciones[funcionIndex] = {
            ...this.funciones[funcionIndex],
            fecha: fecha || this.funciones[funcionIndex].fecha,
            hora: hora || this.funciones[funcionIndex].hora,
            precio: precio ? parseFloat(precio) : this.funciones[funcionIndex].precio,
            asientosDisponibles: asientosDisponibles !== undefined ? 
                parseInt(asientosDisponibles) : this.funciones[funcionIndex].asientosDisponibles
        };

        res.json(this.funciones[funcionIndex]);
    }

    eliminar(req, res) {
        const id = parseInt(req.params.id);
        const funcionIndex = this.funciones.findIndex(f => f.id === id);
        
        if (funcionIndex === -1) {
            return res.status(404).json({ error: 'Función no encontrada' });
        }

        this.funciones.splice(funcionIndex, 1);
        res.status(204).send();
    }

    // GET /funciones/fecha/:fechaInicio/:fechaFin - Funciones en rango de fechas
    obtenerPorRangoFechas(req, res) {
        const { fechaInicio, fechaFin } = req.params;
        
        const funcionesEnRango = this.funciones.filter(funcion => {
            return funcion.fecha >= fechaInicio && funcion.fecha <= fechaFin;
        });

        const funcionesCompletas = funcionesEnRango.map(funcion => ({
            ...funcion,
            pelicula: this.peliculaController.peliculas.find(p => p.id === funcion.peliculaId),
            sala: this.salaController.salas.find(s => s.id === funcion.salaId)
        }));
        
        res.json(funcionesCompletas);
    }

    // DELETE /funciones/:funcionId/relacion - Eliminar relación (simulación)
    eliminarRelacion(req, res) {
        const funcionId = parseInt(req.params.funcionId);
        const funcionIndex = this.funciones.findIndex(f => f.id === funcionId);
        
        if (funcionIndex === -1) {
            return res.status(404).json({ error: 'Función no encontrada' });
        }

        // Simular eliminación de relación (en este caso, desasignar sala)
        this.funciones[funcionIndex].salaId = null;
        
        res.json({ 
            message: 'Relación eliminada exitosamente',
            funcion: this.funciones[funcionIndex]
        });
    }

    vistaLista(req, res) {
        const funcionesCompletas = this.funciones.map(funcion => ({
            ...funcion,
            pelicula: this.peliculaController.peliculas.find(p => p.id === funcion.peliculaId),
            sala: this.salaController.salas.find(s => s.id === funcion.salaId)
        }));

        res.render('funciones', { 
            title: 'Funciones - CinePolis',
            funciones: funcionesCompletas,
            peliculas: this.peliculaController.peliculas,
            salas: this.salaController.salas
        });
    }
}

module.exports = FuncionController;
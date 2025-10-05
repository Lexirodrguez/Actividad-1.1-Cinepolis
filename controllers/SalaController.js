class SalaController {
    constructor() {
        this.salas = [
            {
                id: 1,
                nombre: 'Sala 1',
                capacidad: 150,
                tipo: '2D',
                activa: true
            },
            {
                id: 2,
                nombre: 'Sala 2',
                capacidad: 120,
                tipo: '3D',
                activa: true
            },
            {
                id: 3,
                nombre: 'Sala VIP',
                capacidad: 80,
                tipo: '4DX',
                activa: true
            }
        ];
        this.nextId = 4;
    }

    listar(req, res) {
        res.json(this.salas);
    }

    obtenerPorId(req, res) {
        const id = parseInt(req.params.id);
        const sala = this.salas.find(s => s.id === id);
        
        if (!sala) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }
        
        res.json(sala);
    }

    crear(req, res) {
        const { nombre, capacidad, tipo } = req.body;
        
        if (!nombre || !capacidad || !tipo) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const nuevaSala = {
            id: this.nextId++,
            nombre,
            capacidad: parseInt(capacidad),
            tipo,
            activa: true
        };

        this.salas.push(nuevaSala);
        res.status(201).json(nuevaSala);
    }

    actualizar(req, res) {
        const id = parseInt(req.params.id);
        const salaIndex = this.salas.findIndex(s => s.id === id);
        
        if (salaIndex === -1) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }

        const { nombre, capacidad, tipo, activa } = req.body;
        
        this.salas[salaIndex] = {
            ...this.salas[salaIndex],
            nombre: nombre || this.salas[salaIndex].nombre,
            capacidad: capacidad ? parseInt(capacidad) : this.salas[salaIndex].capacidad,
            tipo: tipo || this.salas[salaIndex].tipo,
            activa: activa !== undefined ? activa : this.salas[salaIndex].activa
        };

        res.json(this.salas[salaIndex]);
    }

    eliminar(req, res) {
        const id = parseInt(req.params.id);
        const salaIndex = this.salas.findIndex(s => s.id === id);
        
        if (salaIndex === -1) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }

        this.salas.splice(salaIndex, 1);
        res.status(204).send();
    }

    // GET /salas/tipo/:tipo - Salas por tipo
    obtenerPorTipo(req, res) {
        const tipo = req.params.tipo;
        const salasFiltradas = this.salas.filter(s => s.tipo === tipo);
        
        res.json(salasFiltradas);
    }

    vistaLista(req, res) {
        res.render('salas', { 
            title: 'Salas - CinePolis',
            salas: this.salas 
        });
    }
}

module.exports = SalaController;
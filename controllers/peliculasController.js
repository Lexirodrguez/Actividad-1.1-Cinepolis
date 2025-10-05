class PeliculasController {
    constructor() {
        this.peliculas = [
            {
                id: 1,
                titulo: 'Avengers: Endgame',
                genero: 'Acción',
                duracion: 181,
                clasificacion: 'PG-13',
                director: 'Anthony y Joe Russo',
                fechaEstreno: '2019-04-26',
                activa: true
            },
            {
                id: 2,
                titulo: 'The Batman',
                genero: 'Acción',
                duracion: 176,
                clasificacion: 'PG-13',
                director: 'Matt Reeves',
                fechaEstreno: '2022-03-04',
                activa: true
            }
        ];
        this.nextId = 3;
    }

    // GET /peliculas - Listar todas las películas
    listar(req, res) {
        res.json(this.peliculas);
    }

    // GET /peliculas/:id - Mostrar película por ID
    obtenerPorId(req, res) {
        const id = parseInt(req.params.id);
        const pelicula = this.peliculas.find(p => p.id === id);
        
        if (!pelicula) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        
        res.json(pelicula);
    }

    // POST /peliculas - Crear nueva película
    crear(req, res) {
        const { titulo, genero, duracion, clasificacion, director, fechaEstreno } = req.body;
        
        if (!titulo || !genero || !duracion) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const nuevaPelicula = {
            id: this.nextId++,
            titulo,
            genero,
            duracion: parseInt(duracion),
            clasificacion,
            director,
            fechaEstreno,
            activa: true
        };

        this.peliculas.push(nuevaPelicula);
        res.status(201).json(nuevaPelicula);
    }

    // PUT /peliculas/:id - Actualizar película
    actualizar(req, res) {
        const id = parseInt(req.params.id);
        const peliculaIndex = this.peliculas.findIndex(p => p.id === id);
        
        if (peliculaIndex === -1) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        const { titulo, genero, duracion, clasificacion, director, fechaEstreno, activa } = req.body;
        
        this.peliculas[peliculaIndex] = {
            ...this.peliculas[peliculaIndex],
            titulo: titulo || this.peliculas[peliculaIndex].titulo,
            genero: genero || this.peliculas[peliculaIndex].genero,
            duracion: duracion ? parseInt(duracion) : this.peliculas[peliculaIndex].duracion,
            clasificacion: clasificacion || this.peliculas[peliculaIndex].clasificacion,
            director: director || this.peliculas[peliculaIndex].director,
            fechaEstreno: fechaEstreno || this.peliculas[peliculaIndex].fechaEstreno,
            activa: activa !== undefined ? activa : this.peliculas[peliculaIndex].activa
        };

        res.json(this.peliculas[peliculaIndex]);
    }

    // DELETE /peliculas/:id - Eliminar película
    eliminar(req, res) {
        const id = parseInt(req.params.id);
        const peliculaIndex = this.peliculas.findIndex(p => p.id === id);
        
        if (peliculaIndex === -1) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        this.peliculas.splice(peliculaIndex, 1);
        res.status(204).send();
    }

    // GET /peliculas/ultimas/5 - Últimas 5 películas por fecha
    obtenerUltimas(req, res) {
        const ultimasPeliculas = this.peliculas
            .sort((a, b) => new Date(b.fechaEstreno) - new Date(a.fechaEstreno))
            .slice(0, 5);
        
        res.json(ultimasPeliculas);
    }

    // Vista: Lista de películas
    vistaLista(req, res) {
        res.render('peliculas', { 
            title: 'Películas - CinePolis',
            peliculas: this.peliculas 
        });
    }

    // Vista: Detalles de película
    vistaDetalles(req, res) {
        const id = parseInt(req.params.id);
        const pelicula = this.peliculas.find(p => p.id === id);
        
        if (!pelicula) {
            return res.status(404).render('error', { message: 'Película no encontrada' });
        }
        
        res.render('detalles', { 
            title: `${pelicula.titulo} - CinePolis`,
            pelicula: pelicula
        });
    }
}

module.exports = PeliculasController;
const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const port = 8080;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});


app.use(cors());
// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'movies.ctafc3zavajx.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '12345678',
    database: 'peliculas'
});

// Conexión a la base de datos
db.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

app.use(express.json());

app.on('error', (err) => {
    console.error('Ocurrió un error en el servidor:', err);
});

// obtener las peliculas
app.get('/pelicula', (req, res) => {

    const query = 'SELECT * FROM pelicula';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos de las series:', error);
            res.status(500).json({ error: 'Error al obtener los datos de las series' });
        } else {


            const peliculas = [];


            results.forEach((pelicula) => {

                const peliculaInfo = {
                    id: pelicula.id,
                    nombre: pelicula.nombre,
                    descripcion: pelicula.descripcion,
                    imagen: pelicula.imagen,
                    popularidad: pelicula.popularidad,
                    genero: pelicula.genero,
                    duracion: pelicula.duracion
                };

                peliculas.push(peliculaInfo);
            });

            console.log('Datos de la tabla', peliculas);


            res.json(peliculas);
        }
    });
});



// obtener las series 
app.get('/serie', (req, res) => {

    const query = 'SELECT * FROM serie';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos de las series:', error);
            res.status(500).json({ error: 'Error al obtener los datos de las series' });
        } else {

            const series = [];


            results.forEach((serie) => {

                const serieInfo = {
                    id: serie.id,
                    nombre: serie.nombre,
                    descripcion: serie.descripcion,
                    imagen: serie.imagen,
                    popularidad: serie.popularidad,
                    genero: serie.genero,
                    duracion: serie.duracion
                };


                series.push(serieInfo);
            });

            console.log('Datos de la tabla', series);


            res.json(series);
        }
    });
});

//  obtener las películas 

app.get('/reciente', (req, res) => {

    const query = 'SELECT * FROM reciente';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos de las series:', error);
            res.status(500).json({ error: 'Error al obtener los datos de las series' });
        } else {

            const recientes = [];

            results.forEach((reciente) => {

                const recienteInfo = {
                    id: reciente.id,
                    nombre: reciente.nombre,
                    descripcion: reciente.descripcion,
                    imagen: reciente.imagen,
                    popularidad: reciente.popularidad,
                    genero: reciente.genero,
                    duracion: reciente.duracion
                };


                recientes.push(recienteInfo);
            });

            console.log('Datos de la tabla', recientes);


            res.json(recientes);
        }
    });
});

//opterner la mejores peliculas

app.get('/mejores', (req, res) => {

    const query = 'SELECT * FROM mejores';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos de las series:', error);
            res.status(500).json({ error: 'Error al obtener los datos de las series' });
        } else {

            const mejores = [];


            results.forEach((mejor) => {

                const mejorInfo = {
                    id: mejor.id,
                    nombre: mejor.nombre,
                    descripcion: mejor.descripcion,
                    imagen: mejor.imagen,
                    popularidad: mejor.popularidad,
                    genero: mejor.genero,
                    duracion: mejor.duracion
                };


                mejores.push(mejorInfo);
            });

            console.log('Datos de la tabla', mejores);


            res.json(mejores);
        }
    });
});

// optener las peliculas en tendencia

app.get('/tendencias', (req, res) => {

    const query = 'SELECT * FROM tendencia';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos de las series:', error);
            res.status(500).json({ error: 'Error al obtener los datos de las series' });
        } else {

            const tendencias = [];


            results.forEach((tendencia) => {

                const tendenciaInfo = {
                    id: tendencia.id,
                    nombre: tendencia.nombre,
                    descripcion: tendencia.descripcion,
                    imagen: tendencia.imagen,
                    popularidad: tendencia.popularidad,
                    genero: tendencia.genero,
                    duracion: tendencia.duracion
                };


                tendencias.push(tendenciaInfo);
            });

            console.log('Datos de la tabla', tendencias);


            res.json(tendencias);
        }
    });
});

// optener las peliculas mas populares

app.get('/populares', (req, res) => {
    const query = 'SELECT * FROM mejores UNION SELECT * FROM tendencia';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos de mejores y tendencia:', error);
            res.status(500).json({ error: 'Error al obtener los datos de mejores y tendencia' });
        } else {

            const populares = [];


            results.forEach((popular) => {

                const popularInfo = {
                    id: popular.id,
                    nombre: popular.nombre,
                    descripcion: popular.descripcion,
                    imagen: popular.imagen,
                    popularidad: popular.popularidad,
                    genero: popular.genero,
                    duracion: popular.duracion
                };


                populares.push(popularInfo);
            });


            populares.sort((a, b) => b.popularidad - a.popularidad);

            console.log('Datos populares ordenados por popularidad:', populares);

            res.json(populares);
        }
    });
});



// Iniciar el servidor
const server = app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

// Manejo de errores
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
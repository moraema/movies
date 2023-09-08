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
    host: 'localhost',
    user: 'root',
    password: '2004',
    database: 'movies'
});

// Conexión a la base de datos
db.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

app.use(express.json()); // Middleware para procesar JSON en las solicitudes

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
            // Crear un arreglo para almacenar las series
            const peliculas = [];

            // Iterar a través de los resultados de la consulta
            results.forEach((pelicula) => {
                // Crear un objeto para cada serie con las características deseadas
                const peliculaInfo = {
                    id: pelicula.id,
                    nombre: pelicula.nombre,
                    descripcion: pelicula.descripcion,
                    imagen: pelicula.imagen,
                    popularidad: pelicula.popularidad,
                    genero: pelicula.genero,
                    duracion: pelicula.duracion
                };

                // Agregar el objeto de la serie al arreglo
                peliculas.push(peliculaInfo);
            });

            console.log('Datos de la tabla', peliculas);

            // Enviar el arreglo de series como respuesta
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
            // Crear un arreglo para almacenar las series
            const series = [];

            // Iterar a través de los resultados de la consulta
            results.forEach((serie) => {
                // Crear un objeto para cada serie con las características deseadas
                const serieInfo = {
                    id: serie.id,
                    nombre: serie.nombre,
                    descripcion: serie.descripcion,
                    imagen: serie.imagen,
                    popularidad: serie.popularidad,
                    genero: serie.genero,
                    duracion: serie.duracion
                };

                // Agregar el objeto de la serie al arreglo
                series.push(serieInfo);
            });

            console.log('Datos de la tabla', series);

            // Enviar el arreglo de series como respuesta
            res.json(series);
        }
    });
});

// Ruta para obtener las películas recientes desde el array

app.get('/reciente', (req, res) => {

    const query = 'SELECT * FROM reciente';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos de las series:', error);
            res.status(500).json({ error: 'Error al obtener los datos de las series' });
        } else {
            // Crear un arreglo para almacenar las series
            const recientes = [];

            // Iterar a través de los resultados de la consulta
            results.forEach((reciente) => {
                // Crear un objeto para cada serie con las características deseadas
                const recienteInfo = {
                    id: reciente.id,
                    nombre: reciente.nombre,
                    descripcion: reciente.descripcion,
                    imagen: reciente.imagen,
                    popularidad: reciente.popularidad,
                    genero: reciente.genero,
                    duracion: reciente.duracion
                };

                // Agregar el objeto de la serie al arreglo
                recientes.push(recienteInfo);
            });

            console.log('Datos de la tabla', recientes);

            // Enviar el arreglo de series como respuesta
            res.json(recientes);
        }
    });
});


app.get('/mejores', (req, res) => {

    const query = 'SELECT * FROM mejores';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos de las series:', error);
            res.status(500).json({ error: 'Error al obtener los datos de las series' });
        } else {
            // Crear un arreglo para almacenar las series
            const mejores = [];

            // Iterar a través de los resultados de la consulta
            results.forEach((mejor) => {
                // Crear un objeto para cada serie con las características deseadas
                const mejorInfo = {
                    id: mejor.id,
                    nombre: mejor.nombre,
                    descripcion: mejor.descripcion,
                    imagen: mejor.imagen,
                    popularidad: mejor.popularidad,
                    genero: mejor.genero,
                    duracion: mejor.duracion
                };

                // Agregar el objeto de la serie al arreglo
                mejores.push(mejorInfo);
            });

            console.log('Datos de la tabla', mejores);

            // Enviar el arreglo de series como respuesta
            res.json(mejores);
        }
    });
});

app.get('/tendencias', (req, res) => {

    const query = 'SELECT * FROM tendencia';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos de las series:', error);
            res.status(500).json({ error: 'Error al obtener los datos de las series' });
        } else {
            // Crear un arreglo para almacenar las series
            const tendencias = [];

            // Iterar a través de los resultados de la consulta
            results.forEach((tendencia) => {
                // Crear un objeto para cada serie con las características deseadas
                const tendenciaInfo = {
                    id: tendencia.id,
                    nombre: tendencia.nombre,
                    descripcion: tendencia.descripcion,
                    imagen: tendencia.imagen,
                    popularidad: tendencia.popularidad,
                    genero: tendencia.genero,
                    duracion: tendencia.duracion
                };

                // Agregar el objeto de la serie al arreglo
                tendencias.push(tendenciaInfo);
            });

            console.log('Datos de la tabla', tendencias);

            // Enviar el arreglo de series como respuesta
            res.json(tendencias);
        }
    });
});

app.get('/populares', (req, res) => {
    const query = 'SELECT * FROM mejores UNION SELECT * FROM tendencia';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos de mejores y tendencia:', error);
            res.status(500).json({ error: 'Error al obtener los datos de mejores y tendencia' });
        } else {
            // Crear un arreglo para almacenar los datos de populares
            const populares = [];

            // Iterar a través de los resultados de la consulta
            results.forEach((popular) => {
                // Crear un objeto para cada elemento con las características deseadas
                const popularInfo = {
                    id: popular.id,
                    nombre: popular.nombre,
                    descripcion: popular.descripcion,
                    imagen: popular.imagen,
                    popularidad: popular.popularidad,
                    genero: popular.genero,
                    duracion: popular.duracion
                };

                // Agregar el objeto al arreglo de populares
                populares.push(popularInfo);
            });

            // Ordenar el arreglo de populares por popularidad (en orden descendente)
            populares.sort((a, b) => b.popularidad - a.popularidad);

            console.log('Datos populares ordenados por popularidad:', populares);

            // Enviar el arreglo de elementos populares como respuesta
            res.json(populares);
        }
    });
});



// Iniciar el servidor
const server = app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

// Manejo de errores no capturados en las promesas
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Aquí puedes agregar código adicional para manejar el error de manera adecuada
});
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'link0208',
    database: 'mascotas',
});

// Conexión a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

// Ruta para obtener mascotas
app.get('/api/mascotas', (req, res) => {
    const { tamaño, hogar, edad, compatible_con_ninos, compatible_con_otros, nivel_actividad, temperamento } = req.query;

    // Construcción dinámica de la consulta
    let query = 'SELECT * FROM adopcion WHERE 1=1';
    const params = [];

    if (tamaño) {
        query += ' AND tamaño = ?';
        params.push(tamaño);
    }
    if (hogar) {
        query += ' AND hogar = ?';
        params.push(hogar);
    }
    if (edad) {
        query += ' AND edad = ?';
        params.push(edad);
    }
    if (compatible_con_ninos !== undefined) {
        query += ' AND compatible_con_ninos = ?';
        params.push(compatible_con_ninos === 'true');
    }
    if (compatible_con_otros !== undefined) {
        query += ' AND compatible_con_otros_animales = ?';
        params.push(compatible_con_otros === 'true');
    }
    if (nivel_actividad) {
        query += ' AND nivel_actividad = ?';
        params.push(nivel_actividad);
    }
    if (temperamento) {
        query += ' AND temperamento = ?';
        params.push(temperamento);
    }

    // Ejecución de la consulta
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error al realizar la consulta: ', err);
            res.status(500).send('Error al realizar la consulta');
        } else {
            res.json(results);
        }
    });
});

// Inicio del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

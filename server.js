// organizador-api/server.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'reservas.json');

// Middlewares
app.use(cors()); 
app.use(express.json()); // Permite a Express leer el JSON enviado en el cuerpo de la petición

// --- Funciones de Utilidad para manejo de JSON ---

const leerReservas = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return []; // Si el archivo no existe o está vacío, retorna un array vacío
    }
};

const guardarReservas = (reservas) => {
    // Guarda el array de reservas con formato legible
    fs.writeFileSync(DB_FILE, JSON.stringify(reservas, null, 2), 'utf8');
};

// --- RUTAS DE LA API ---

// 1. RUTA GET: Obtener todas las reservas de la Sala 1
app.get('/api/reservas/sala1', (req, res) => {
    const reservas = leerReservas();
    res.status(200).json(reservas);
});


// 2. RUTA POST: Registrar una nueva reserva para la Sala 1
app.post('/api/reservas/sala1', (req, res) => {
    const nuevaReserva = req.body;
    
    // Verificamos que los campos coincidan con tu formulario
    if (!nuevaReserva.usuario || !nuevaReserva.tipo || !nuevaReserva.horario) {
        return res.status(400).json({ error: 'Faltan campos obligatorios (usuario, tipo, horario).' });
    }

    const reservas = leerReservas();
    
    // Generar un ID simple y único
    const nuevoId = reservas.length > 0 ? Math.max(...reservas.map(r => r.id)) + 1 : 1;

    const reservaCompleta = {
        id: nuevoId,
        sala: "Sala 1", // Fijo para esta API
        horario: nuevaReserva.horario, // Ejemplo: "08:00 - 10:00"
        usuario: nuevaReserva.usuario,
        tipo: nuevaReserva.tipo,
        estado: 'Pendiente' // Estado inicial
    };

    reservas.push(reservaCompleta);
    guardarReservas(reservas);

    // Responder con la reserva creada y el código 201 (Created)
    res.status(201).json(reservaCompleta);
});


// 3. RUTA PUT/DELETE: Liberar una sala (eliminar la reserva)
app.delete('/api/reservas/sala1/:id', (req, res) => {
    const reservaId = parseInt(req.params.id);
    let reservas = leerReservas();
    
    const index = reservas.findIndex(r => r.id === reservaId);

    if (index === -1) {
        return res.status(404).json({ error: 'Reserva no encontrada.' });
    }

    // Eliminamos la reserva del array
    reservas.splice(index, 1);
    
    guardarReservas(reservas);

    res.status(200).json({ mensaje: `Reserva con ID ${reservaId} eliminada (Liberada).` });
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
    console.log(`Prueba GET: http://localhost:${PORT}/api/reservas/sala1`);
});
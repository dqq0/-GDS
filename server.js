// organizador-api/server.js (MULTI-SALA)

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'reservas.json'); // El archivo de datos sigue siendo el mismo

// Middlewares
app.use(cors()); 
app.use(express.json()); 


const leerReservas = () => { /* ... (código sin cambios) ... */ };
const guardarReservas = (reservas) => { /* ... (código sin cambios) ... */ };


// --- NUEVAS RUTAS DINÁMICAS ---


app.get('/api/reservas/:salaId', (req, res) => {
    const salaId = req.params.salaId; // Captura el ID de la sala (1, 2, 3, 4)
    const reservas = leerReservas();
    
    // Filtramos las reservas para obtener solo las de la sala solicitada
    const reservasSala = reservas.filter(r => r.salaId.toString() === salaId);

    res.status(200).json(reservasSala);
});



app.post('/api/reservas/:salaId', (req, res) => {
    const salaId = req.params.salaId; // Captura el ID de la sala de la URL
    const nuevaReserva = req.body;
    
    if (!nuevaReserva.usuario || !nuevaReserva.tipo || !nuevaReserva.horario) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    const reservas = leerReservas();
    const nuevoId = reservas.length > 0 ? Math.max(...reservas.map(r => r.id)) + 1 : 1;

    const reservaCompleta = {
        id: nuevoId,
        salaId: parseInt(salaId), // Guardamos el ID de la sala como número
        horario: nuevaReserva.horario,
        usuario: nuevaReserva.usuario,
        tipo: nuevaReserva.tipo,
        estado: 'Pendiente'
    };

    reservas.push(reservaCompleta);
    guardarReservas(reservas);

    res.status(201).json(reservaCompleta);
});



app.delete('/api/reservas/:salaId/:id', (req, res) => {
   
    const reservaId = parseInt(req.params.id);
    let reservas = leerReservas();
    
    const index = reservas.findIndex(r => r.id === reservaId);

    if (index === -1) {
        return res.status(404).json({ error: 'Reserva no encontrada.' });
    }

    reservas.splice(index, 1);
    guardarReservas(reservas);

    res.status(200).json({ mensaje: `Reserva con ID ${reservaId} eliminada.` });
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
    console.log(`Rutas Genéricas: /api/reservas/:salaId`);
});

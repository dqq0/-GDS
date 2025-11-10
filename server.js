// organizador-api/server.js (API Completa para el Organizador de Salas)

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'reservas.json');

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// --- Funciones de Utilidad (Manejo de Archivos) ---

const leerReservas = () => {
    try {
        if (fs.existsSync(DB_FILE)) {
            const data = fs.readFileSync(DB_FILE, 'utf8');
            return JSON.parse(data);
        }
        return []; 
    } catch (error) {
        console.error("Error al leer reservas:", error);
        return []; 
    }
};

const guardarReservas = (reservas) => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(reservas, null, 2), 'utf8');
    } catch (error) {
        console.error("Error al guardar reservas:", error);
    }
};

// --- Rutas Dinámicas ---

// Obtener todas las reservas para una sala específica
app.get('/api/reservas/:salaId', (req, res) => {
    const salaId = req.params.salaId;
    const reservas = leerReservas();
    
    // Filtramos las reservas por salaId (comparando como strings por seguridad)
    const reservasSala = reservas.filter(r => r.salaId.toString() === salaId);

    res.status(200).json(reservasSala);
});

// Registrar una nueva reserva en una sala
app.post('/api/reservas/:salaId', (req, res) => {
    const salaId = req.params.salaId;
    const nuevaReserva = req.body;
    
    if (!nuevaReserva.usuario || !nuevaReserva.tipo || !nuevaReserva.horario) {
        return res.status(400).json({ error: 'Faltan campos obligatorios (usuario, tipo, horario).' });
    }
    
    // Validación de horario duplicado (opcional, pero recomendado)
    const reservasActuales = leerReservas();
    const horarioOcupado = reservasActuales.some(r => 
        r.salaId.toString() === salaId && r.horario === nuevaReserva.horario
    );

    if (horarioOcupado) {
        return res.status(409).json({ error: `El horario ${nuevaReserva.horario} ya está ocupado en la Sala ${salaId}.` });
    }


    const nuevoId = reservasActuales.length > 0 ? Math.max(...reservasActuales.map(r => r.id)) + 1 : 1;

    const reservaCompleta = {
        id: nuevoId,
        salaId: parseInt(salaId),
        horario: nuevaReserva.horario,
        usuario: nuevaReserva.usuario,
        tipo: nuevaReserva.tipo,
        estado: 'Ocupada' // Lo cambié de 'Pendiente' a 'Ocupada' para reflejar un registro inmediato
    };

    reservasActuales.push(reservaCompleta);
    guardarReservas(reservasActuales);

    res.status(201).json(reservaCompleta);
});

// Eliminar (Liberar) una reserva específica
app.delete('/api/reservas/:salaId/:id', (req, res) => {
   
    const reservaId = parseInt(req.params.id);
    let reservas = leerReservas();
    
    const index = reservas.findIndex(r => r.id === reservaId);

    if (index === -1) {
        return res.status(404).json({ error: 'Reserva no encontrada.' });
    }

    // Eliminamos la reserva del array
    reservas.splice(index, 1);
    guardarReservas(reservas);

    res.status(200).json({ mensaje: `Reserva con ID ${reservaId} eliminada.` });
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor API corriendo en http://localhost:${PORT}`);
    console.log(`Rutas de la API: /api/reservas/:salaId`);
});

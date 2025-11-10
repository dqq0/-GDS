// Simulación de base de datos
const salas = {
  1: { estado: "desocupada", usuario: null, tipo: null, horario: null },
  2: { estado: "desocupada", usuario: null, tipo: null, horario: null },
  3: { estado: "desocupada", usuario: null, tipo: null, horario: null },
  4: { estado: "desocupada", usuario: null, tipo: null, horario: null },
};

// Selección de botones y contenedor de información
const botonesSala = document.querySelectorAll(".boton-sala");
const infoSala = document.getElementById("info-sala");

// Manejar clic en los botones de sala
// script.js (Lógica de Redirección Corregida)

const botonesSala = document.querySelectorAll(".boton-sala");
const infoSala = document.getElementById("info-sala");

botonesSala.forEach((boton) => {
    boton.addEventListener("click", () => {
        const salaId = boton.getAttribute("data-sala");
        
        
        window.location.href = `sala${salaId}.html`; 
    });
});

// Nota: Puedes eliminar las funciones 'mostrarInfoSala', 'mostrarFormulario', 
// y 'agregarBotonLimpiar' del script.js si planeas que TODAS las salas 
// se gestionen a través de sus archivos HTML dedicados (salaX.html).

// Función para mostrar información de la sala
function mostrarInfoSala(salaId) {
  const sala = salas[salaId];
  infoSala.innerHTML = `<h3>Sala ${salaId}</h3>`;

  if (sala.estado === "desocupada") {
    infoSala.innerHTML += `
      <p>Estado: <span style="color: green;">Desocupada</span></p>
      <p>Esta sala está disponible para su uso.</p>
    `;
    mostrarFormulario(salaId); // Mostrar formulario para registrar datos
  } else {
    infoSala.innerHTML += `
      <p>Estado: <span style="color: ${sala.estado === "pendiente" ? "orange" : "red"};">${sala.estado}</span></p>
      <p>Usuario: ${sala.usuario}</p>
      <p>Tipo: ${sala.tipo}</p>
      <p>Horario: ${sala.horario}</p>
      <button id="limpiar-sala-${salaId}" class="boton-limpiar">Liberar Sala</button>
    `;
    agregarBotonLimpiar(salaId); // Agregar botón para liberar la sala
  }
}

// Función para mostrar el formulario
function mostrarFormulario(salaId) {
  const formulario = document.createElement("form");
  formulario.innerHTML = `
    <h4>Registrar usuario para la sala ${salaId}</h4>
    <label for="usuario-${salaId}">Usuario:</label>
    <input type="text" id="usuario-${salaId}" name="usuario" required>
    <label for="tipo-${salaId}">Tipo:</label>
    <select id="tipo-${salaId}" name="tipo" required>
      <option value="Profesor">Profesor</option>
      <option value="Ayudante">Ayudante</option>
      <option value="Estudiante">Estudiante</option>
    </select>
    <label for="horario-${salaId}">Horario:</label>
    <input type="text" id="horario-${salaId}" name="horario" placeholder="Ej: 2:00 PM - 4:00 PM" required>
    <button type="submit">Registrar</button>
  `;

  // Manejar el envío del formulario
  formulario.onsubmit = (e) => {
    e.preventDefault();
    const usuario = formulario.querySelector(`#usuario-${salaId}`).value;
    const tipo = formulario.querySelector(`#tipo-${salaId}`).value;
    const horario = formulario.querySelector(`#horario-${salaId}`).value;

    // Actualizar la "base de datos"
    salas[salaId] = {
      estado: "pendiente",
      usuario,
      tipo,
      horario,
    };

    // Mostrar la información actualizada
    mostrarInfoSala(salaId);
  };

  // Agregar el formulario al contenedor de información
  infoSala.appendChild(formulario);
}

// Función para agregar el botón de limpiar
function agregarBotonLimpiar(salaId) {
  const botonLimpiar = document.getElementById(`limpiar-sala-${salaId}`);
  botonLimpiar.addEventListener("click", () => {
    // Restablecer la sala a su estado inicial
    salas[salaId] = {
      estado: "desocupada",
      usuario: null,
      tipo: null,
      horario: null,
    };

    // Mostrar la información actualizada
    mostrarInfoSala(salaId);
  });
}


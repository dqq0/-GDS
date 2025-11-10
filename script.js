// script.js (Lógica estándar: Sala 1 redirige, Salas 2-4 usan simulación local)

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
botonesSala.forEach((boton) => {
  boton.addEventListener("click", () => {
    const salaId = boton.getAttribute("data-sala");

    if (salaId === "1") {
      // LÓGICA ORIGINAL: Redirigir a sala1.html para la Sala 1
      window.location.href = "sala1.html";
    } else {
      // LÓGICA ORIGINAL: Mostrar información local para el resto de salas
      mostrarInfoSala(salaId);
    }
  });
});

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




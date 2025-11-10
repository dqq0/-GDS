// script.js (SOLO para index.html - Lógica de redirección simple)

// Selección de botones y contenedor de información (aunque ya no se use en el index)
const botonesSala = document.querySelectorAll(".boton-sala");
const infoSala = document.getElementById("info-sala");

// Manejar clic en los botones de sala
botonesSala.forEach((boton) => {
  boton.addEventListener("click", () => {
    // Obtiene el número de sala del atributo data-sala
    const salaId = boton.getAttribute("data-sala");
    
    // Redirige al archivo HTML correspondiente
    // Ejemplo: data-sala="1" redirige a sala1.html
    window.location.href = `sala${salaId}.html`; 
  });
});



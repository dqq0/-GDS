// Manejar clic en los botones de sala
// script.js (SOLUCIÓN FINAL para la redirección de los 4 botones)

// Selección de botones
const botonesSala = document.querySelectorAll(".boton-sala");

// Manejar clic en los botones de sala
botonesSala.forEach((boton) => {
  boton.addEventListener("click", () => {
    const salaId = boton.getAttribute("data-sala");

    if (salaId) {
      // Redirección Universal: Construye la URL dinámicamente.
      window.location.href = `sala${salaId}.html`;
    } else {
      console.error("Error de configuración: El botón no tiene el atributo data-sala.");
    }
  });
});

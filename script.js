// 1. Obtener los elementos del DOM por su ID
const textoContador = document.getElementById("contador");
const boton = document.getElementById("btn-like");
const cuerpoTabla = document.getElementById("cuerpo-tabla");

// 2. Variable de estado (let, para poder cambiarla)
let likes = 0;

// 3. Convierte una fecha en texto HH:MM:SS
function formatearHora(fecha) {
  const hh = String(fecha.getHours()).padStart(2, "0");
  const mm = String(fecha.getMinutes()).padStart(2, "0");
  const ss = String(fecha.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

// 4. Evento click del botón
boton.addEventListener("click", () => {
  likes++;
  textoContador.textContent = likes;

  const fila = document.createElement("tr");

  const celdaNumero = document.createElement("td");
  celdaNumero.textContent = likes;

  const celdaHora = document.createElement("td");
  celdaHora.textContent = formatearHora(new Date());

  fila.appendChild(celdaNumero);
  fila.appendChild(celdaHora);

  cuerpoTabla.prepend(fila);
});
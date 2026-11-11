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

  actualizarColor();
});

// 5. Reto 1: botón reiniciar
const botonReiniciar = document.getElementById("btn-reiniciar");

botonReiniciar.addEventListener("click", () => {
  likes = 0;
  textoContador.textContent = likes;
  cuerpoTabla.innerHTML = "";

  actualizarColor();
});

// 6. Reto 2: cambiar color al superar 10 likes
function actualizarColor() {
  document.body.classList.toggle("superado", likes > 10);
}

 // Mantener solo los últimos 20 registros
  while (cuerpoTabla.rows.length > 20) {
    cuerpoTabla.deleteRow(-1);
  }

  // Atajo: la barra espaciadora también suma un like
document.addEventListener("keydown", (evento) => {
  if (evento.code === "Space" && !evento.repeat) {
    evento.preventDefault();
    boton.click();
  }
});
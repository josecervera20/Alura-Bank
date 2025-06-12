// Selectores DOM
const botonAbrirCamara = document.querySelector("[data-video-boton]");
const campoCamara = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");

const botonTomarFoto = document.querySelector("[data-tomar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensaje = document.querySelector("[data-mensaje]");

let imagenURL = "";

const botonEnviar = document.querySelector("[data-enviar]");

/**
 * Inicializa la cámara web y muestra la transmisión en el elemento de video.
 * Oculta el botón de "Abrir cámara" y muestra el contenedor de la cámara.
 * @async
 * @returns {Promise<void>} Una promesa que resuelve cuando la cámara se ha iniciado correctamente.
 */
async function inicializarCamara() {
  try {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    botonAbrirCamara.style.display = "none";
    campoCamara.style.display = "block";
    video.srcObject = iniciarVideo;
  } catch (error) {
    console.error("Error al acceder a la cámara:", error);
    alert(
      "No se pudo acceder a la cámara. Por favor, asegúrate de haber dado permiso."
    );
  }
}

/**
 * Toma una foto desde la transmisión de video y la dibuja en el canvas.
 * Almacena la URL de la imagen capturada en 'imagenURL'.
 * Oculta el contenedor de la cámara y muestra el mensaje al usuario.
 */
function tomarFoto() {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  imagenURL = canvas.toDataURL("image/jpeg");

  campoCamara.style.display = "none";
  mensaje.style.display = "block";
}

/**
 * Recupera los datos de registro del almacenamiento local,
 * añade la URL de la imagen capturada y guarda los datos actualizados.
 * Finalmente, redirige al usuario a la siguiente página del formulario.
 */
function enviarDatos() {
  const recibirDatosGuardados = localStorage.getItem("registro");
  let convertirDatos = {};

  if (recibirDatosGuardados) {
    convertirDatos = JSON.parse(recibirDatosGuardados);
  }

  convertirDatos.img_url = imagenURL;
  localStorage.setItem("registro", JSON.stringify(convertirDatos));

  window.location.href = "./abrir-cuenta-form-3.html";
}

// Event Listeners
botonAbrirCamara.addEventListener("click", inicializarCamara);
botonTomarFoto.addEventListener("click", tomarFoto);
botonEnviar.addEventListener("click", enviarDatos);

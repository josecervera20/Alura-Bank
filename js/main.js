// Importa funciones de validación específicas y la configuración de errores.
import esUnCuil from "./validar-cuil.js";
import esMayorDeEdad from "./validar-edad.js";
import { tiposError, mensajes } from "./custom-Error.js";

// Selecciona todos los campos del formulario que tienen el atributo 'required'.
const camposDeFormulario = document.querySelectorAll("[required]");
// Selecciona el formulario completo por su atributo de datos.
const formulario = document.querySelector("[data-formulario]");

// Agrega un escuchador para el evento 'submit' del formulario.
formulario.addEventListener("submit", (e) => {
  // Previene el comportamiento predeterminado del envío del formulario.
  e.preventDefault();

  // Crea un objeto con las respuestas del formulario.
  const listaRespuestas = {
    nombre: e.target.elements.nombre.value,
    email: e.target.elements.email.value,
    identificacion: e.target.elements.identificacion.value,
    cuil: e.target.elements.cuil.value,
    fecha_nacimiento: e.target.elements.fecha_nacimiento.value,
  };

  // Guarda las respuestas en el almacenamiento local como una cadena JSON.
  localStorage.setItem("registro", JSON.stringify(listaRespuestas));

  // Redirige al usuario a la siguiente página del formulario.
  window.location.href = "./abrir-cuenta-form-2.html";
});

// Itera sobre cada campo del formulario.
camposDeFormulario.forEach((campo) => {
  // Agrega un escuchador para el evento 'blur' (cuando el campo pierde el foco).
  campo.addEventListener("blur", () => verificarCampo(campo));
  // Previene el comportamiento predeterminado del navegador para errores de validación 'invalid'.
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

/**
 * Verifica la validez de un campo de entrada y muestra un mensaje de error si es necesario.
 * Limpia cualquier mensaje de validación personalizado anterior.
 * Aplica validaciones específicas para CUIL y fecha de nacimiento.
 * Busca el tipo de error en el objeto de mensajes de error y lo muestra.
 * @param {HTMLInputElement} campo - El elemento de entrada HTML a verificar.
 */
function verificarCampo(campo) {
  let mensaje = "";
  // Limpia cualquier validez personalizada establecida previamente.
  campo.setCustomValidity("");

  // Aplica la validación de CUIL si el campo es 'cuil' y tiene la longitud mínima.
  if (campo.name === "cuil" && campo.value.length >= 11) {
    esUnCuil(campo);
  }
  // Aplica la validación de edad si el campo es 'fecha_nacimiento' y no está vacío.
  if (campo.name === "fecha_nacimiento" && campo.value !== "") {
    esMayorDeEdad(campo);
  }

  // Itera sobre los tipos de error definidos para encontrar el mensaje apropiado.
  tiposError.forEach((error) => {
    if (campo.validity[error]) {
      mensaje = mensajes[campo.name][error];
    }
  });

  // Selecciona el elemento donde se mostrará el mensaje de error.
  const mensajeError = campo.parentNode.querySelector(".mensaje-error");
  // Comprueba la validez general del campo.
  const validarInputCheck = campo.checkValidity();

  // Muestra el mensaje de error si el campo no es válido, de lo contrario, lo limpia.
  if (!validarInputCheck) {
    mensajeError.textContent = mensaje;
  } else {
    mensajeError.textContent = "";
  }
}

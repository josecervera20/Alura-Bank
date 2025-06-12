/**
 * Verifica si la persona es mayor de edad basándose en su fecha de nacimiento.
 * Si no es mayor de edad, establece un mensaje de validez personalizado en el campo.
 * @param {HTMLInputElement} campo - El elemento de entrada HTML que contiene la fecha de nacimiento (valor YYYY-MM-DD).
 * @returns {void}
 */
export default function esMayorDeEdad(campo) {
  const fechaNacimiento = new Date(campo.value); // Crea un objeto Date desde el valor del campo.

  // Si la validación de edad falla, establece un mensaje de validez personalizado.
  if (!validarEdad(fechaNacimiento)) {
    campo.setCustomValidity("Debes ser mayor de 18 años para registrarte.");
  }
}

/**
 * Comprueba si la fecha de nacimiento indica que la persona es mayor o igual a 18 años.
 * Calcula la fecha actual y la fecha de cumpleaños número 18 para la comparación.
 * @param {Date} fecha - El objeto Date de la fecha de nacimiento.
 * @returns {boolean} `true` si la persona es mayor o igual a 18 años, `false` en caso contrario.
 */
function validarEdad(fecha) {
  const fechaActual = new Date(); // Obtiene la fecha actual.
  // Calcula la fecha en que la persona cumpliría 18 años.
  const fechaMas18 = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  // Compara si la fecha actual es mayor o igual que la fecha de los 18 años.
  return fechaActual >= fechaMas18;
}

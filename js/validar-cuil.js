/**
 * Valida un número de CUIL (Código Único de Identificación Laboral) o CUIT (Código Único de Identificación Tributaria).
 * Elimina guiones del valor de entrada antes de la validación.
 * Establece un mensaje de validez personalizado en el campo si el CUIL/CUIT no es válido.
 * @param {HTMLInputElement} campo - El elemento de entrada HTML que contiene el valor del CUIL/CUIT.
 * @returns {void}
 */
export default function esUnCuil(campo) {
  // Limpia el CUIL/CUIT de guiones para la validación.
  const cuil = campo.value.replace(/-/g, "");

  // Comprueba si el CUIL/CUIT no tiene caracteres repetidos antes de continuar con otras validaciones.
  if (!tieneCaracteresRepetidos(cuil)) {
    // Valida los primeros dígitos y el dígito verificador.
    if (validarPrimerosDigitosCuil(cuil) && validarDigitoVerificador(cuil)) {
      // El CUIL/CUIT es válido, no se necesita acción explícita aquí para pasar la validación.
    } else {
      campo.setCustomValidity("No es un código CUIL/CUIT válido.");
    }
  } else {
    campo.setCustomValidity(
      "No es un código CUIL/CUIT válido (números repetidos)."
    );
  }
}

/**
 * Verifica si un número de CUIL/CUIT contiene secuencias de dígitos repetidos (e.g., "00000000000").
 * @param {string} cuil - El número de CUIL/CUIT a verificar.
 * @returns {boolean} `true` si contiene números repetidos, `false` en caso contrario.
 */
function tieneCaracteresRepetidos(cuil) {
  const numerosRepetidos = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ];
  return numerosRepetidos.includes(cuil);
}

/**
 * Valida los dos primeros dígitos de un número de CUIL/CUIT.
 * @param {string} cuil - El número de CUIL/CUIT a verificar.
 * @returns {boolean} `true` si los primeros dos dígitos son válidos, `false` en caso contrario.
 */
function validarPrimerosDigitosCuil(cuil) {
  const primerosDigitos = Number(cuil.slice(0, 2));
  const digitosValidos = [20, 23, 24, 27, 30, 33, 34];

  return digitosValidos.includes(primerosDigitos);
}

/**
 * Valida el dígito verificador de un número de CUIL/CUIT.
 * Implementa el algoritmo de validación estándar para CUIL/CUIT.
 * @param {string} cuil - El número de CUIL/CUIT a verificar.
 * @returns {boolean} `true` si el dígito verificador es correcto, `false` en caso contrario.
 */
function validarDigitoVerificador(cuil) {
  const digitoVerificador = Number(cuil.slice(-1));
  // Convierte los primeros 10 dígitos en un array de números.
  const digitos = cuil.substring(0, 10).split("").map(Number);
  const factores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let acumulado = 0;

  // Realiza la suma ponderada de los dígitos.
  for (let i = 0; i < digitos.length; i++) {
    acumulado += digitos[i] * factores[i];
  }

  // Calcula el dígito verificador esperado.
  let verificador = 11 - (acumulado % 11);
  if (verificador === 11) {
    verificador = 0;
  }

  // Compara el dígito verificador esperado con el dígito verificador real.
  return digitoVerificador === verificador;
}

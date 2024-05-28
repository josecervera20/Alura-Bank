export default function esUncuil(campo) {
  const cuil = campo.value.replace(/\-/g, "");
  if (!tieneCaracteresRepetidos(cuil)) {
    if (validarPrimerosDigitoscuil(cuil) && validarDigitoVerificador(cuil)) {
      // console.log("el Cuil existe");
    } else {
      campo.setCustomValidity("No es un código válido");
      // console.log("el Cuil NO existe");
    }
  } else {
    console.log("Números repetidos");
    campo.setCustomValidity("Son números repetidos");
  }
}

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

/* Validar primeros digitos */
function validarPrimerosDigitoscuil(cuil) {
  let primerosDigitos = Number(cuil.slice(0, 2)); //o substr
  let digitosValidos = [20, 23, 24, 27, 30, 33, 34];

  return digitosValidos.includes(primerosDigitos); // Verificar los primeros dos dígitos
}

//Validar digito verificador
function validarDigitoVerificador(cuil) {
  let digitoVerificador = Number(cuil.slice(-1)); //o substring

  let digitos = cuil.substr(0, 10).split("").map(Number);

  let acumulado = 0;
  let factores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < digitos.length; i++) {
    acumulado += digitos[i] * factores[i];
  }

  let verificador = 11 - (acumulado % 11);
  if (verificador === 11) {
    verificador = 0;
  }

  return digitoVerificador === verificador;
}
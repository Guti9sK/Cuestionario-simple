const preguntasCuestionario = [
  {
    question: "¿Cuál es la capital de Finlandia?",
    answers: [
      { text: "Helsinki", correct: true },
      { text: "Berlín", correct: false },
      { text: "Tokyo", correct: false },
      { text: "Oslo", correct: false },
    ],
  },
  {
    question: "¿Cuál es el planeta más grande del sistema solar?",
    answers: [
      { text: "Urano", correct: false },
      { text: "Neptuno", correct: false },
      { text: "Júpiter", correct: true },
      { text: "Saturno", correct: false },
    ],
  },
  {
    question: "¿En qué continente se encuentra el desierto del Sahara?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Oceania", correct: false },
      { text: "América del Sur", correct: false },
      { text: "África", correct: true },
    ],
  },
  {
    question:
      "¿Cuál es la distancia aproximada entre la Tierra y el Sol en km?",
    answers: [
      { text: "150 M km", correct: true },
      { text: "1 Billón de km", correct: false },
      { text: "500 M km", correct: false },
      { text: "300 M km", correct: false },
    ],
  },
  {
    question: "¿Cuál es el rio más largo del mundo?",
    answers: [
      { text: "Amazonas", correct: false },
      { text: "Nilo", correct: true },
      { text: "Yangtze", correct: false },
      { text: "Misisipi", correct: false },
    ],
  },
];

const pregunta = document.getElementById("pregunta");
const botonRespuestas = document.getElementById("botones-respuesta");
const botonSiguiente = document.getElementById("boton-siguiente");

let currentQuestionIndex = 0;
let puntaje = 0;

function comenzarCuestionario() {
  currentQuestionIndex = 0;
  puntaje = 0;
  botonSiguiente.innerHTML = "Siguiente";
  mostrarCuestionario();
}

function mostrarCuestionario() {
  resetearEstados();
  let currentQuestion = preguntasCuestionario[currentQuestionIndex];
  let preguntaNo = currentQuestionIndex + 1;
  pregunta.innerHTML = preguntaNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const boton = document.createElement("button");
    boton.innerHTML = answer.text;
    boton.classList.add("btn");
    botonRespuestas.appendChild(boton);
    if (answer.correct) {
      boton.dataset.correct = answer.correct;
    }
    boton.addEventListener("click", seleccionarRespuesta);
  });
}

function resetearEstados() {
  botonSiguiente.style.display = "none";
  while (botonRespuestas.firstChild) {
    botonRespuestas.removeChild(botonRespuestas.firstChild);
  }
}
function seleccionarRespuesta(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    puntaje++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(botonRespuestas.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });
  botonSiguiente.style.display = "block";
}


function mostrarPuntuacion() {
    resetearEstados();
    pregunta.innerHTML = `Tu puntuación es ${puntaje} de ${preguntasCuestionario.length}`;
    botonSiguiente.innerHTML = "Reiniciar";
    botonSiguiente.style.display = "block";
}

function manejarSiguienteBoton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < preguntasCuestionario.length) {
    mostrarCuestionario();
  } else {
    mostrarPuntuacion();
  }
}

botonSiguiente.addEventListener("click", () => {
  if (currentQuestionIndex < preguntasCuestionario.length) {
    manejarSiguienteBoton();
  } else {
    comenzarCuestionario();
  }
});

comenzarCuestionario();

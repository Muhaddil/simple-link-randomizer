window.onload = function () {
  const cards = document.querySelectorAll(".card");
  let lastCardIndex = localStorage.getItem("lastCard");

  if (lastCardIndex === null) {
    // If it is the user's first visit, show a random card
    lastCardIndex = Math.floor(Math.random() * cards.length);
  } else {
    // Convert the retrieved index back to a number
    lastCardIndex = Number(lastCardIndex);
  }

  // Save the index back to localStorage
  localStorage.setItem("lastCard", lastCardIndex);

  // Show the selected card
  cards[lastCardIndex].style.display = "block";
};

// Constants
const GRADIENT_ANGLE = 150;
const COLOR_START = "#0055ff";
const COLOR_END = "#FF0000";
const INITIAL_PERCENTAGE = 50;
const MOUSEMOVE_FACTOR = 40;
const MIN_PERCENTAGE = 30;
const MAX_PERCENTAGE = 70;

// Function to change the gradient
function changeGradient(x) {
  const bgWebKit = `linear-gradient(${GRADIENT_ANGLE}deg, ${COLOR_START} ${x}%, ${COLOR_END} ${
    x + 10
  }%)`;
  const bgMoz = `linear-gradient(${GRADIENT_ANGLE}deg, ${COLOR_START} ${x}%, ${COLOR_END} ${
    x + 10
  }%)`;
  document.body.style.backgroundImage = bgWebKit;
  document.body.style.backgroundImage = bgMoz;
}

// Changes the gradient on page load
document.addEventListener("DOMContentLoaded", function () {
  changeGradient(INITIAL_PERCENTAGE);
});

// Changes the gradient with mouse movement
document.body.addEventListener("mousemove", function (e) {
  let x = (e.clientX / window.innerWidth - 0.5) * MOUSEMOVE_FACTOR; // Mouse position on the X axis
  x = 50 - x; // Adjusts the center of the gradient
  x = Math.min(Math.max(x, MIN_PERCENTAGE), MAX_PERCENTAGE); // Limits x to a range of 30 to 70
  changeGradient(x);
});

// Función para mostrar el tooltip
function mostrarTooltip(tooltiptext) {
  const tooltipCentral = document.getElementById('tooltipCentral');
  tooltipCentral.innerHTML = tooltiptext.innerHTML;
  tooltipCentral.style.visibility = 'visible';
  tooltipCentral.style.opacity = 1;

  // Agrega los eventos de cierre aquí
  Array.from(tooltipCentral.getElementsByClassName('closebtn')).forEach(function(element) {
    element.addEventListener('click', function(event) {
      event.stopPropagation();
      ocultarTooltip();
    });
  });

  // Añade la clase tooltip-active al cuerpo del documento
  document.body.classList.add('tooltip-active');
}

// Función para ocultar el tooltip
function ocultarTooltip() {
  const tooltipCentral = document.getElementById('tooltipCentral');
  tooltipCentral.style.visibility = 'hidden';
  tooltipCentral.style.opacity = 0;

  // Quita la clase tooltip-active del cuerpo del documento
  document.body.classList.remove('tooltip-active');
}

document.body.addEventListener("mousemove", function (e) {
  const x = e.clientX / window.innerWidth;
  const textoIzquierdo = document.getElementById("textoIzquierdo");
  const textoDerecho = document.getElementById("textoDerecho");
  if (x < 0.45) {
    textoIzquierdo.style.opacity = "1";
    textoIzquierdo.style.transform = "translateX(0)";
    textoDerecho.style.opacity = "0";
    textoDerecho.style.transform = "translateX(100%)";
  } else if (x > 0.55) {
    textoIzquierdo.style.opacity = "0";
    textoIzquierdo.style.transform = "translateX(-100%)";
    textoDerecho.style.opacity = "1";
    textoDerecho.style.transform = "translateX(0)";
  } else {
    textoIzquierdo.style.opacity = "0";
    textoIzquierdo.style.transform = "translateX(-100%)";
    textoDerecho.style.opacity = "0";
    textoDerecho.style.transform = "translateX(100%)";
  }
});

// Eventos del click para el texto izquierdo
document.getElementById('textoIzquierdo').addEventListener('click', function(event) {
  const tooltiptext = this.querySelector('.tooltiptext');
  if (tooltiptext.style.visibility !== 'visible') {
    mostrarTooltip(tooltiptext);
  } else {
    ocultarTooltip();
  }
});

// Eventos del click para el texto derecho
document.getElementById('textoDerecho').addEventListener('click', function(event) {
  const tooltiptext = this.querySelector('.tooltiptext');
  if (tooltiptext.style.visibility !== 'visible') {
    mostrarTooltip(tooltiptext);
  } else {
    ocultarTooltip();
  }
});

// Añade un z-index a los elementos con los que deseas interactuar
document.getElementById('textoIzquierdo').style.zIndex = 3;
document.getElementById('textoDerecho').style.zIndex = 3;
Array.from(document.getElementsByClassName('closebtn')).forEach(function(element) {
  element.style.zIndex = 10;
});

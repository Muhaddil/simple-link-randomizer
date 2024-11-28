window.onload = function () {
  const cards = document.querySelectorAll(".card");
  let lastCardIndex = localStorage.getItem("lastCard");

  if (lastCardIndex === null) {
      lastCardIndex = Math.floor(Math.random() * cards.length);
  } else {
      lastCardIndex = Number(lastCardIndex);
  }

  localStorage.setItem("lastCard", lastCardIndex);
  cards[lastCardIndex].style.display = "block";

  const formSection = document.getElementById('form-section');
  formSection.style.display = 'none';
};

// Cambiar tema
document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;

  let theme = localStorage.getItem('theme');
  
  if (!theme) {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDarkScheme ? 'dark-theme' : 'light-theme';
  }

  body.classList.add(theme);

  const isLight = theme === 'light-theme';
  document.getElementById('theme-toggle').textContent = isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro';
});

document.getElementById('theme-toggle').addEventListener('click', function () {
  const body = document.body;
  const isLight = body.classList.contains('light-theme');
  
  if (isLight) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme');
    this.textContent = 'Cambiar a modo claro';
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme');
    this.textContent = 'Cambiar a modo oscuro';
  }
});

// Mostrar/ocultar sección de formulario al hacer clic en el botón "Opositar"
document.getElementById('opositar-button').addEventListener('click', function (event) {
  const oposicionesAbiertas = true; 
  const opositarLink = document.getElementById('opositar-link');

  if (!oposicionesAbiertas) {
    event.preventDefault(); 
    opositarLink.click(); 
  } else {
    const formSection = document.getElementById('form-section');
    formSection.style.display = formSection.style.display === 'none' ? 'block' : 'none';
    if (formSection.style.display === 'block') {
        formSection.scrollIntoView({ behavior: 'smooth' });
    }
    const isHidden = formSection.style.display === 'none';
    this.setAttribute('aria-expanded', !isHidden);
  }
});

// Función para mostrar el tooltip
function mostrarTooltip(tooltiptext) {
  const tooltipCentral = document.getElementById('tooltipCentral');
  tooltipCentral.innerHTML = tooltiptext.innerHTML;
  tooltipCentral.style.visibility = 'visible';
  tooltipCentral.style.opacity = 1;

  Array.from(tooltipCentral.getElementsByClassName('closebtn')).forEach(function (element) {
      element.addEventListener('click', function (event) {
          event.stopPropagation();
          ocultarTooltip();
      });
  });

  document.body.classList.add('tooltip-active');
}

// Función para ocultar el tooltip
function ocultarTooltip() {
  const tooltipCentral = document.getElementById('tooltipCentral');
  tooltipCentral.style.visibility = 'hidden';
  tooltipCentral.style.opacity = 0;
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
document.getElementById('textoIzquierdo').addEventListener('click', function (event) {
  const tooltiptext = this.querySelector('.tooltiptext');
  if (tooltiptext.style.visibility !== 'visible') {
      mostrarTooltip(tooltiptext);
  } else {
      ocultarTooltip();
  }
});

// Eventos del click para el texto derecho
document.getElementById('textoDerecho').addEventListener('click', function (event) {
  const tooltiptext = this.querySelector('.tooltiptext');
  if (tooltiptext.style.visibility !== 'visible') {
      mostrarTooltip(tooltiptext);
  } else {
      ocultarTooltip();
  }
});

document.getElementById('textoIzquierdo').style.zIndex = 3;
document.getElementById('textoDerecho').style.zIndex = 3;
Array.from(document.getElementsByClassName('closebtn')).forEach(function (element) {
  element.style.zIndex = 10;
});


const images = [
  document.getElementById("bg1"),
  document.getElementById("bg2"),
  document.getElementById("bg3"),
  document.getElementById("bg4"),
  document.getElementById("bg5"),
  document.getElementById("bg6"),
  document.getElementById("bg7"),
];

let shuffledIndices = shuffleArray([...Array(images.length).keys()]);
let currentImageIndex = 0;
let nextImageIndex = 1;

function changeBackgroundImage() {
  images[shuffledIndices[currentImageIndex]].style.transition =
    "opacity 1s ease, transform 1s ease";
  images[shuffledIndices[currentImageIndex]].style.opacity = "0";
  images[shuffledIndices[currentImageIndex]].style.transform = "scale(1)";

  images[shuffledIndices[nextImageIndex]].style.transition =
    "opacity 1s ease, transform 10s ease";
  images[shuffledIndices[nextImageIndex]].style.opacity = "1";
  images[shuffledIndices[nextImageIndex]].style.transform = "scale(1.1)";

  // Update indices
  currentImageIndex = nextImageIndex;
  nextImageIndex = (nextImageIndex + 1) % images.length;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

setInterval(changeBackgroundImage, 5000); 
changeBackgroundImage();

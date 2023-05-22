const video = document.querySelector("#video-player");
const playButton = document.querySelector("#play-button");

// Bottones
const scubaBtn = document.getElementById("scuba-btn");
const broggiBtn = document.getElementById("broggi-btn");
const otroBtn = document.getElementById("otro-btn");
const playScubaBtn = document.getElementById("jugar-scuba");
const linkedinBtn = document.getElementById("linkedin");

// Previene usar flechas para avançar video
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
    event.preventDefault();
  }
});

video.addEventListener("click", () => {
  document.body.focus();
});

// Oculta el botón de reproducción cuando el video está reproduciéndose
video.addEventListener("play", () => {
  playButton.style.display = "none";
});

// Muestra el botón de reproducción cuando el video está pausado
video.addEventListener("pause", () => {
  playButton.style.display = "block";
});

// Inicia la reproducción del video y oculta el botón de reproducción cuando se hace clic en él
playButton.addEventListener("click", () => {
  video.play();
  playButton.style.display = "none";
});

// Guardamos el ultimo proyecto visitado
let scubaVisited = false;
let broggiVisited = false;

let viewOtherVisited = false;

scubaBtn.addEventListener("click", () => {
  scubaVisited = true;
});

broggiBtn.addEventListener("click", () => {
  broggiVisited = true;
});

otroBtn.addEventListener("click", () => {
  viewOtherProject();

  viewOtherVisited = true;
});

// Depende del segundo del video muestra ciertos botones
video.addEventListener("timeupdate", function () {
  if (video.currentTime >= 10 && video.currentTime <= 20) {
    scubaBtn.style.display = "grid";
  } else {
    scubaBtn.style.display = "none";
  }

  if (video.currentTime >= 12 && video.currentTime <= 20) {
    broggiBtn.style.display = "grid";
  } else {
    broggiBtn.style.display = "none";
  }

  if (video.currentTime >= 53 && video.currentTime <= 60) {
    otroBtn.style.display = "grid";
  } else {
    otroBtn.style.display = "none";
  }

  if (video.currentTime >= 104 && video.currentTime <= 114) {
    playScubaBtn.style.display = "grid";
    console.log("mostrar play scuba");
  }

  if (video.currentTime >= 107 && video.currentTime <= 114) {
    linkedinBtn.style.display = "grid";
  }

  if (video.currentTime >= 114 && video.currentTime <= 116) {
    linkedinBtn.style.display = "none";
    playScubaBtn.style.display = "none";
  }

  if (video.currentTime >= 119 && video.currentTime <= 130) {
    playScubaBtn.style.display = "grid";
  }

  if (video.currentTime >= 121 && video.currentTime <= 130) {
    linkedinBtn.style.display = "grid";
  }

  if (video.currentTime >= 130 && video.currentTime) {
    linkedinBtn.style.display = "none";
    playScubaBtn.style.display = "none";
  }

  if (video.currentTime >= 19 && video.currentTime <= 21 && !scubaVisited && !broggiVisited) {
    video.currentTime = 14.3;
  }

  if (video.currentTime >= 50.4 && video.currentTime <= 52 && broggiVisited && scubaVisited) {
    video.currentTime = 100.6;
  }

  if (video.currentTime >= 59 && video.currentTime <= 60 && !viewOtherVisited) {
    video.currentTime = 115.75;
    viewOtherVisited = true;
  }

  if (video.currentTime >= 100 && video.currentTime <= 101 && !scubaVisited) {
    video.currentTime = 51;
  }

  if (video.currentTime >= 114 && video.currentTime <= 115) {
    video.currentTime = 132;
  }

  // Reset video status
  if ((video.currentTime >= 0 && video.currentTime <= 7) || video.currentTime >= 135) {
    scubaVisited = false;
    broggiVisited = false;
    viewOtherVisited = false;

    console.log("Reset video statuts");
  }
});

// Avanza el video a cierto segundo
function skipVideoTo(timestamp) {
  video.currentTime = timestamp;
  video.play();
}

function viewOtherProject() {
  if (!scubaVisited) {
    video.currentTime = 21;
    scubaVisited = true;
  }

  if (!broggiVisited) {
    video.currentTime = 61;
    broggiVisited = true;
  }
}

const BG = document.querySelector("body");

function changeBG(nb) {
  const image = new Image();
  image.src = `./images/${nb}.jpg`;
  image.classList.add("background");
  BG.appendChild(image);
}

function createNb() {
  return Math.floor(Math.random() * 8);
}

function init() {
  const randomNb = createNb() + 1;
  changeBG(randomNb);
}

init();

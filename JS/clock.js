const clock = document.querySelector(".js-clock"),
  clock_text = clock.querySelector(".js-clock_text"),
  footer = document.querySelector(".js-footer");

function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  clock_text.innerText = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}`;
  footer.innerText = `JaeHeong ${year}`;
}

function init() {
  getDate();
  setInterval(getDate, 1000);
}

init();

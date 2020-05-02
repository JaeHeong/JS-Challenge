const temp_text = document.querySelector(".js-temp"),
  city_text = document.querySelector(".js-city");

const KEY = "e92e9821cc75ae92a20559f2ecbddcd5";

const COORDS = "coords";

const coords = {
  latitude: "",
  longitude: "",
};

function paintWeather(temp, city) {
  temp_text.innerText = `${temp}°`;
  city_text.innerText = `${city}`;
}

function getWeather(lat, lon) {
  coords.latitude = lat;
  coords.longitude = lon;
  localStorage.setItem(COORDS, JSON.stringify(coords));
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`
  )
    .then(function (respone) {
      return respone.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const city = json.name;
      paintWeather(temp, city);
    });
}

function success(e) {
  const lat = e.coords.latitude;
  const lon = e.coords.longitude;
  getWeather(lat, lon);
}

function error() {
  console.error("error");
}

function loadWeather() {
  const currentCoords = localStorage.getItem(COORDS);
  if (currentCoords === null) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    const parsedCoords = JSON.parse(currentCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadWeather();
}

init();

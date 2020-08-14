function giveDate() {
  let present = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[present.getDay()];
  let hour = present.getHours();
  let minutes = present.getMinutes();
  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = `${day}, ${hour}:${minutes}`;
  if (minutes <= 9) {
    minutes = `0${minutes}`;
  }
}
giveDate();

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#formGroupExampleInput");
  let nameCity = document.querySelector("#cityName");
  if (cityInput.value) {
    nameCity.innerHTML = `${cityInput.value}`;
  } else {
    alert("Please type a city🌆");
  }
  let apiKey = "445b59e1c2b5dacc40535dc0b8ba3f74";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(`${apiUrl}${cityInput.value}&units=metric&appid=${apiKey}`)
    .then(giveTemp);
}

let button = document.querySelector(".btn.btn-outline-dark");
button.addEventListener("click", showCity);

function giveTemp(response) {
  console.log(response.data.main.temp);
  console.log(response.data.weather[0].description);
  let roundTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${roundTemp}°c`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = `${response.data.weather[0].description}`;
}

function handlePosition(event) {
  navigator.geolocation.getCurrentPosition(givePosition);
}
function givePosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let geoLocation = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "445b59e1c2b5dacc40535dc0b8ba3f74";
  axios
    .get(
      `${geoLocation}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    )
    .then(giveLocation);
}
function giveLocation(response) {
  console.log(response.data.main.temp);
  console.log(response.data.name);
  let roundTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${roundTemp}°c`;
  let city = document.querySelector("#cityName");
  city.innerHTML = response.data.name;
}

let button1 = document.querySelector("#location");
button1.addEventListener("click", handlePosition);

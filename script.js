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

function giveDate(timestamp) {
  let present = new Date(timestamp);
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
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = present.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hour}:${minutes}`;
}

function giveTemp(response) {
  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = giveDate(response.data.dt * 1000);
  let roundTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${roundTemp}`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = `${response.data.weather[0].description}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let clouds = document.querySelector("#cloud");
  clouds.innerHTML = response.data.clouds.all;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

let button = document.querySelector(".btn.btn-outline-dark");
button.addEventListener("click", showCity);

function handlePosition(event) {
  navigator.geolocation.getCurrentPosition(givePosition);
}
function givePosition(position) {
  let longitude = `${position.coords.longitude}`;
  let latitude = `${position.coords.latitude}`;
  let apiKey = "445b59e1c2b5dacc40535dc0b8ba3f74";
  let geoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(geoLocation).then(giveLocation);
}
function giveLocation(response) {
  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = giveDate(response.data.dt * 1000);
  let roundTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${roundTemp}`;
  let city = document.querySelector("#cityName");
  city.innerHTML = response.data.name;
  let currentDes = document.querySelector("#weather-description");
  currentDes.innerHTML = `${response.data.weather[0].description}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let clouds = document.querySelector("#cloud");
  clouds.innerHTML = response.data.clouds.all;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

let button1 = document.querySelector("#location");
button1.addEventListener("click", handlePosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

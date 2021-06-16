// Display the current date and time using JavaScript. Format: Tuesday 16:00

let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentTime.getDay()];

let currentHours = currentTime.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}

let currentMinutes = currentTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let formattedDate = document.querySelector("#date-time");
formattedDate.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;

// Search engine, when searching for a city,
// display the city name on the page after the user submits the form
// and the current temp of the city

function showTemperature(response) {
  let tempHeading = document.querySelector("#city-temp");

  celsiusTempt = response.data.main.temp;

  let temperature = Math.ceil(celsiusTempt);
  tempHeading.innerHTML = temperature;

  let location = document.querySelector("#city-name");
  location.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
}

function search(city) {
  let apiKey = "0acaa1de783699a7c805c0e5bad91ab8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let citySearched = document.querySelector("#city-name");
  citySearched.innerHTML = searchInput.value;
  search(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

// Units

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.ceil(celsiusTempt * 1.8 + 32);
  let tempHeading = document.querySelector("#city-temp");
  tempHeading.innerHTML = fahrenheitTemp;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsius(event) {
  event.preventDefault();
  let tempHeading = document.querySelector("#city-temp");
  tempHeading.innerHTML = Math.ceil(celsiusTempt);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTempt = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

// Forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row text-center">`;

  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3">
          <div class="weather-forecast-date">${day}</div>
          <img src="" alt="" width="" />
          <div class="weather-forecast-temperatures">
                      <span class="weather-forecast-temperature-max">18°</span>
                      <span class="weather-forecast-temperature-min">10°</span>
          </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Bonus Feature: Current Location button

function showPositionTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0acaa1de783699a7c805c0e5bad91ab8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionTemp);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

search("New York");
displayForecast();

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
  let celsiusTempt = Math.ceil(response.data.main.temp);
  tempHeading.innerHTML = celsiusTempt;
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

search("New York");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

// Units

function displayFahrenheit(event) {
  event.preventDefault();
  let currentTempF = Math.ceil(celsiusTempt * 1.8 + 32);
  tempHeading.innerHTML = currentTempF;
}

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", displayFahrenheit);

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

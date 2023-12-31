// Get current date and time
let now = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let currentMonth = document.querySelector("#month");
currentMonth.innerHTML = `Last updated: ${month}`;

let date = now.getDate();
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${date}`;
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = daysOfWeek[now.getDay()];
let currentDay = document.querySelector("#day");
let hours = now.getHours();
let currentHour = document.querySelector("#hours");
let formattedHour = hours < 10 ? `0${hours}` : `${hours}`;
let minutes = now.getMinutes();
let currentMinutes = document.querySelector("#minutes");
let formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
let dayTime = document.querySelector("#day-time");
dayTime.innerHTML = `${day} ${formattedHour}:${formattedMinutes}`;

// Function to display weather information
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  celsiusTemperature = response.data.temperature.current;
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = `${temperature}`;
  let description = document.querySelector("#current-weather-description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = response.data.condition.icon;
  let currentDayIcon = document.querySelector("#weather-current-day-icon");
  currentDayIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );
  currentDayIcon.setAttribute("alt", response.data.condition.icon);
}
// Function to fetch weather data for a city on load
function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=o2bde3ft15fc0e6fbb7362fdb8a79c4f&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
// Event listener for search form submission
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  handleForecast(city);
  search(city);
}
// Attach event listener to the search form
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function displayFahrenheit(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#degree");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = `${fahrenheitTemperature}`;
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");

fahrenheitLink.addEventListener("click", displayFahrenheit);
celsiusLink.addEventListener("click", displayCelsius);

// Function to display weather forecast
function displayWeatherForecast(response) {
  let forecastData = response.data.daily;
  let forecastRow = document.querySelector("#forecast-row");

  // Clear existing forecast data
  forecastRow.innerHTML = "";

  for (let i = 1; i < forecastData.length; i++) {
    let forecast = forecastData[i];
    let forecastDay = new Date(forecast.time * 1000);
    let forecastIcon = forecast.condition.icon_url;
    let forecastMaxTemp = Math.round(forecast.temperature.maximum);
    let forecastMinTemp = Math.round(forecast.temperature.minimum);

    let forecastItem = document.createElement("div");
    forecastItem.classList.add("col-md-2", "text-center");

    let forecastDayElement = document.createElement("h2");
    forecastDayElement.classList.add("weather-forecast-day");
    forecastDayElement.textContent = forecastDay.toLocaleDateString("en-US", {
      weekday: "short",
    });

    let forecastIconElement = document.createElement("img");
    forecastIconElement.src = forecastIcon;
    forecastIconElement.alt = forecast.condition.description;

    let forecastTemperaturesElement = document.createElement("div");
    forecastTemperaturesElement.classList.add("weather-forecast-temperatures");
    forecastTemperaturesElement.innerHTML = `${forecastMaxTemp}°  ${forecastMinTemp}°`;

    forecastItem.appendChild(forecastDayElement);
    forecastItem.appendChild(forecastIconElement);
    forecastItem.appendChild(forecastTemperaturesElement);

    forecastRow.appendChild(forecastItem);
  }
}

function handleForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=o2bde3ft15fc0e6fbb7362fdb8a79c4f&units=metric`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

// Display weather for Berlin when the page loads
search("Berlin");
handleForecast("Berlin");

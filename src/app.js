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
  search(city);
}
// Attach event listener to the search form
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Get the current location button element
let currentLocationButton = document.querySelector("#current-location");
// Function to get and display current weather for user's current location
function getCurrentWeatherForCurrentLocation(event) {
  event.preventDefault();
  // Function to handle current position
  function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "o2bde3ft15fc0e6fbb7362fdb8a79c4f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

    // Fetch weather data and call the display function to show the weather parameters
    axios.get(apiUrl).then(showTemperature);
  }
  // Get the current location button element
  navigator.geolocation.getCurrentPosition(handlePosition);
}
// Attach event listener to the button
currentLocationButton.addEventListener(
  "click",
  getCurrentWeatherForCurrentLocation
);

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

// Display weather for Berlin when the page loads
search("Berlin");

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
currentMonth.innerHTML = `${month}`;

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
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = `${temperature}°C`;
  let description = document.querySelector("#current-weather-description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}
// Function to fetch weather data for a city on load
function search(city) {
  let apiKey = "ae9e8cb2baee2735d5eaa4401665af2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
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
    let apiKey = "2718952144ed077c12e7c160fb6fc351";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
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
// Display weather for Berlin when the page loads
search("Berlin");

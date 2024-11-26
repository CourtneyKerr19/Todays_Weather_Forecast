document.getElementById("search-button").addEventListener("click", getWeather);
document.getElementById("city").addEventListener("keypress", (event) => event.key === "Enter" && getWeather());
document.getElementById("weather-icon").addEventListener("mouseover", showInfo);

function getWeather() {
  const cityName = document.getElementById("city").value;
  if (!cityName) return alert("Please enter a city name.");

  displayDateTime();
  fetchWeatherData(cityName);
}

function fetchWeatherData(cityName) {
  const apiKey = "bbc3200cce48b4fecdf5a1598bcefd26";
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  Promise.all([fetch(currentWeatherUrl), fetch(forecastUrl)])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([current, forecast]) => {
      displayWeather(createWeatherObject(current, cityName));
      displayHourlyForecast(forecast.list.slice(0, 8));
    })
    .catch(() => alert("Error fetching weather data. Please try again."));
}

function createWeatherObject(data, cityName) {
  return {
    name: cityName,
    temperature: Math.round(data.main.temp - 273.15),
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
  };
}

function displayWeather(weather) {
  document.getElementById("temp-div").innerHTML = `<p>${weather.temperature}°C</p>`;
  document.getElementById("weather-info").innerHTML = `<p>${weather.name}</p><p>${weather.description}</p>`;
  document.getElementById("weather-icon").src = weather.icon;
  document.getElementById("weather-icon").alt = weather.description;
  document.getElementById("weather-icon").style.display = "block";
}

function displayHourlyForecast(forecasts) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  hourlyForecastDiv.innerHTML = forecasts
    .map((f) => {
      const time = new Date(f.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const temp = Math.round(f.main.temp - 273.15);
      const icon = `http://openweathermap.org/img/wn/${f.weather[0].icon}.png`;
      return `<div class="hourly-item"><span>${time}</span><img src="${icon}" alt="Icon"><span>${temp}°C</span></div>`;
    })
    .join("");
}

function displayDateTime() {
  const now = new Date();
  document.getElementById("date-time").innerHTML = `
    <p>${now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
    <p>${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>`;
}

function showInfo() {
  const additionalInfo = document.createElement("p");
  additionalInfo.innerText = "Weather data provided by OpenWeatherMap.";
  additionalInfo.style.fontSize = "12px";
  additionalInfo.style.color = "lightgray";
  document.getElementById("weather-info").appendChild(additionalInfo);
  setTimeout(() => additionalInfo.remove(), 2000);
}
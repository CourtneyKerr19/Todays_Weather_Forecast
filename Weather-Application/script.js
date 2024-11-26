document.getElementById("search-button").addEventListener("click", getWeather);
document.getElementById("city").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});
document.getElementById("weather-icon").addEventListener("mouseover", function () {
  const weatherInfo = document.getElementById("weather-info");
  const additionalInfo = document.createElement("p");
  additionalInfo.innerText = "Weather data provided by OpenWeatherMap.";
  additionalInfo.style.fontSize = "12px";
  additionalInfo.style.color = "lightgray";
  weatherInfo.appendChild(additionalInfo);

  setTimeout(() => additionalInfo.remove(), 2000);
});

function getWeather() {
  const cityName = document.getElementById("city").value;

  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  displayDateTime();

  const apiKey = "bbc3200cce48b4fecdf5a1598bcefd26";
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      const city = {
        name: data.name,
        latitude: data.coord.lat,
        longitude: data.coord.lon
      };

      const weather = {
        temperature: Math.round(data.main.temp - 273.15), 
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      };

      displayWeather(city, weather);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    });

  
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      const forecasts = data.list.slice(0, 8).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        temperature: Math.round(item.main.temp - 273.15), 
        icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`
      }));

      displayHourlyForecast(forecasts);
    })
    .catch(error => {
      console.error("Error fetching forecast data:", error);
      alert("Error fetching forecast data. Please try again.");
    });
}

function displayWeather(city, weather) {
  const tempDiv = document.getElementById("temp-div");
  const weatherInfo = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");

  // Clear previous data
  tempDiv.innerHTML = "";
  weatherInfo.innerHTML = "";
  weatherIcon.src = "";

  tempDiv.innerHTML = `<p>${weather.temperature}°C</p>`;
  weatherInfo.innerHTML = `<p>${city.name}</p><p>${weather.description}</p>`;
  weatherIcon.src = weather.icon;
  weatherIcon.alt = weather.description;

  showImage();
}

function displayHourlyForecast(forecasts) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  hourlyForecastDiv.innerHTML = ""; 

  forecasts.forEach(forecast => {
    const hourlyItemHtml = `
      <div class="hourly-item">
        <span>${forecast.time}</span>
        <img src="${forecast.icon}" alt="Hourly Weather Icon">
        <span>${forecast.temperature}°C</span>
      </div>
    `;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function displayDateTime() {
  const now = new Date();
  const dateTime = {
    date: now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    day: now.toLocaleDateString("en-US", { weekday: "long" })
  };

  const dateTimeDiv = document.getElementById("date-time");
  dateTimeDiv.innerHTML = `
    <p>${dateTime.day}, ${dateTime.date}</p>
    <p>${dateTime.time}</p>
  `;
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}

function getWeather() {
  const apiKey = "cea1b5c39f90da85436bec567502aeb5";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city name.");
    return;
  }
}

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const forecaseUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

function getWeather() {
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching current weather data in your area:', error);
      alert('Error fetching current weather data. Please try again.')
    })
}
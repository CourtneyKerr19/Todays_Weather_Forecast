function getWeather() {
  const apiKey = "cea1b5c39f90da85436bec567502aeb5";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city name.");
    return;
  }
}
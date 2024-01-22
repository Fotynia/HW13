async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    try {
      const coordinatesResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=491bb8e339f5c90186f6b85f66bf5587`);
      const coordinatesData = await coordinatesResponse.json();
      const { lat, lon } = coordinatesData[0];
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=491bb8e339f5c90186f6b85f66bf5587`);
      const weatherData = await weatherResponse.json();
      displayWeather(weatherData);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  function displayWeather(weatherData) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '';
    const weatherParameters = ['Temperature', 'Humidity', 'Pressure', 'Wind Speed', 'Description'];
    weatherParameters.forEach(parameter => {
      const p = document.createElement('p');
      p.textContent = `${parameter}: ${getWeatherParameter(weatherData, parameter)}`;
      weatherInfo.appendChild(p);
    });
  }
  function getWeatherParameter(weatherData, parameter) {
    switch (parameter) {
      case 'Temperature':
        return `${(weatherData.main.temp - 273.15).toFixed(2)} °C`;
      case 'Humidity':
        return `${weatherData.main.humidity} %`;
      case 'Pressure':
        return `${weatherData.main.pressure} hPa`;
      case 'Wind Speed':
        return `${weatherData.wind.speed} m/s`;
      case 'Description':
        return weatherData.weather[0].description;
      default:
        return '';
    }
  }
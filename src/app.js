const API_KEY = 'a8d8abb3964193b9b2137ccd57ef3709';

const weatherCurrent = document.querySelector('.weather-current');
const searchbox = document.getElementById('search');
searchbox.addEventListener('keypress', async (event) => {
  if (event.key != 'Enter') return;
  const geoData = await getGeoData(searchbox.value);
  const currentWeatherData = await getCurrentWeatherData(searchbox.value);
  const weekWeatherData = await getWeekWeatherData(
    geoData.latitude,
    geoData.longitude,
    geoData.timezone
  );
  clearResult();
  displayResults(geoData);
  displayResults(currentWeatherData);
  displayResults(weekWeatherData);
});

async function getGeoData(query) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=ru&format=json`;
  let geoData;
  await fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      geoData = obj.results[0];
    });
  return geoData;
}

async function getCurrentWeatherData(query) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${API_KEY}`;
  let currentWeatherData;
  await fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      currentWeatherData = obj;
    });
  return currentWeatherData;
}

async function getWeekWeatherData(lat, long, time) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&timezone=${time}&daily=weathercode,temperature_2m_max,temperature_2m_min`;
  let weekWeatherData;
  await fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      weekWeatherData = obj.daily;
    });
  return weekWeatherData;
}

function displayResults(weather) {
  weatherCurrent.innerHTML += JSON.stringify(weather);
  console.log(JSON.stringify(weather));
}

function clearResult() {
  weatherCurrent.innerHTML = '';
}

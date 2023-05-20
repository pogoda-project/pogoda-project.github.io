const API_KEY = 'a8d8abb3964193b9b2137ccd57ef3709';

const searchButton = document.getElementById('search-button');
searchField.addEventListener('keypress', async (event) => {
  if (event.key != 'Enter') return;
  const value = searchField.value;
  await updateWeatherData(value);
});
searchButton.addEventListener('click', async (event) => {
  const value = searchField.value;
  await updateWeatherData(value);
});

async function updateWeatherData(value) {
  const geoData = await getGeoData(value);
  const currentWeatherData = await getCurrentWeatherData(
    geoData.latitude,
    geoData.longitude
  );
  const weekWeatherData = await getWeekWeatherData(
    geoData.latitude,
    geoData.longitude,
    geoData.timezone
  );
  displayResults(geoData);
  displayResults(currentWeatherData);
  displayResults(weekWeatherData);

  updateLocation(geoData);
  updateCurrentWeather(currentWeatherData);
  updateDateTime(geoData.timezone);
  updateWeatherIndicators(currentWeatherData);
  updateWeatherForecast(weekWeatherData);
  updateWeatherParameters(currentWeatherData, geoData.timezone);
}

function updateLocation(geoData) {
  const city = document.querySelector('.city');
  const country = document.querySelector('.country');
  city.innerHTML = geoData.name + ',';
  country.innerHTML = geoData.country;
  if (geoData.country == 'Украина') country.innerHTML = 'Россия';
  if (geoData.admin && geoData.admin != geoData.name)
    country.innerHTML += ', ' + geoData.admin;
  if (geoData.admin1 && geoData.admin1 != geoData.name)
    country.innerHTML += ', ' + geoData.admin1;
}

function updateCurrentWeather(currentWeatherData) {
  const icon = document.querySelector('.weather-current-svg-box');
  const temperature = document.querySelector('.current-temperature');
  const condition = document.querySelector('.current-condition');
  const conditions = {
    Thunderstorm: 'Гроза',
    Drizzle: 'Морось',
    Rain: 'Дождь',
    Snow: 'Снег',
    Mist: 'Туман',
    Smoke: 'Дым',
    Haze: 'Дымка',
    Dust: 'Пыль',
    Fog: 'Туман',
    Sand: 'Песчаная буря',
    Ash: 'Пепел',
    Squall: 'Шквал',
    Tornado: 'Торнадо',
    Clear: 'Ясно',
    Clouds: 'Облачно',
  };

  icon.innerHTML = openweather[currentWeatherData.weather[0].icon];
  temperature.innerHTML = Math.round(currentWeatherData.main.temp) + '&deg';
  condition.innerHTML = conditions[currentWeatherData.weather[0].main];
}

function updateDateTime(timezone) {
  const date = document.querySelector('.current-date');
  const weekDay = document.querySelector('.current-week-day');
  const time = document.querySelector('.current-time');
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: timezone })
  );
  const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июня',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];
  const weekDays = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  date.innerHTML = now.getDate() + ' ' + months[now.getMonth()];
  weekDay.innerHTML = weekDays[now.getDay()];
  time.innerHTML =
    now.getHours().toString().padStart(2, '0') +
    ':' +
    now.getMinutes().toString().padStart(2, '0');
}

function updateWeatherIndicators(currentWeatherData) {
  const windSpeed = document.querySelector('.wind-speed');
  const humidityPercent = document.querySelector('.humidity-percent');
  const rainfallLevel = document.querySelector('.rainfall-level');
  windSpeed.innerHTML = Math.round(currentWeatherData.wind.speed) + ' м/с';
  humidityPercent.innerHTML =
    Math.round(currentWeatherData.main.humidity) + ' %';
  rainfallLevel.innerHTML = currentWeatherData.rain
    ? Math.round(currentWeatherData.rain['1h']) + ' мм'
    : 'нет';
}

function updateWeatherForecast(weekWeatherData) {
  const hourlyWeatherList = document.querySelectorAll('.hourly-weather-item');
  hourlyWeatherList.forEach((item, index) => {
    const temperature = item.querySelector('.hourly-weather-temperature');
    const tooltip = item.querySelector('.forecast-tooltip');
    const icon = item.querySelector('.svg-box');

    temperature.innerHTML =
      Math.round(weekWeatherData[0].temperature_2m[index]) + ' &deg';
    tooltip.innerHTML = openmeteo[weekWeatherData[0].weathercode[index]][0];
    icon.innerHTML =
      openmeteo[weekWeatherData[0].weathercode[index]][
        2 - weekWeatherData[0].is_day[index]
      ];
  });

  const tommorowWeatherList = document.querySelectorAll(
    '.tommorow-weather-item'
  );
  tommorowWeatherList.forEach((item, index) => {
    const temperature = item.querySelector('.tommorow-weather-temperature');
    const tooltip = item.querySelector('.forecast-tooltip');
    const icon = item.querySelector('.svg-box');
    index += 24;

    temperature.innerHTML =
      Math.round(weekWeatherData[0].temperature_2m[index]) + ' &deg';
    tooltip.innerHTML = openmeteo[weekWeatherData[0].weathercode[index]][0];
    console.log(tooltip.innerHTML);
    icon.innerHTML =
      openmeteo[weekWeatherData[0].weathercode[index]][
        2 - weekWeatherData[0].is_day[index]
      ];
  });

  const weeklyWeatherList = document.querySelectorAll('.weekly-weather-item');
  weeklyWeatherList.forEach((item, index) => {
    const weekDay = item.querySelector('.forecast-week-day');
    const date = item.querySelector('.week-day-date');
    const maxTemperature = item.querySelector('.week-day-max-temperature');
    const minTemperature = item.querySelector('.week-day-min-temperature');
    const tooltip = item.querySelector('.forecast-tooltip');
    const icon = item.querySelector('.svg-box');
    const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    weekDay.innerHTML =
      weekDays[new Date(weekWeatherData[1].time[index]).getDay()];
    date.innerHTML =
      weekWeatherData[1].time[index].substring(8, 10) +
      '/' +
      weekWeatherData[1].time[index].substring(5, 7);
    maxTemperature.innerHTML =
      Math.round(weekWeatherData[1].temperature_2m_max[index]) + ' &deg';
    minTemperature.innerHTML =
      Math.round(weekWeatherData[1].temperature_2m_min[index]) + ' &deg';
    tooltip.innerHTML = openmeteo[weekWeatherData[1].weathercode[index]][0];
    icon.innerHTML = openmeteo[weekWeatherData[1].weathercode[index]][1];
  });
}

function updateWeatherParameters(currentWeatherData, timezone) {
  const feelsLikeTemperature = document.querySelector(
    '.feels-like-temperature'
  );
  const feelsLikeDescription = document.querySelector(
    '.feels-like-decsription'
  );
  feelsLikeTemperature.innerHTML =
    Math.round(currentWeatherData.main.feels_like) + '&deg';
  feelsLikeDescription.innerHTML =
    currentWeatherData.main.feels_like > currentWeatherData.main.temp
      ? 'Из-за влажности кажется, что теплее'
      : 'Из-за ветра кажется, что холоднее';

  const sunriseTime = document.querySelector('.sunrise-time');
  const sunsetTime = document.querySelector('.sunset-time');
  const sunrise = new Date(
    new Date(currentWeatherData.sys.sunrise * 1000).toLocaleString('en-US', {
      timeZone: timezone,
    })
  );
  const sunset = new Date(
    new Date(currentWeatherData.sys.sunset * 1000).toLocaleString('en-US', {
      timeZone: timezone,
    })
  );
  sunriseTime.innerHTML =
    sunrise.getHours().toString().padStart(2, '0') +
    ':' +
    sunrise.getMinutes().toString().padStart(2, '0');
  sunsetTime.innerHTML =
    sunset.getHours().toString().padStart(2, '0') +
    ':' +
    sunset.getMinutes().toString().padStart(2, '0');

  const cloudinessPercent = document.querySelector('.cloudiness-percent');
  cloudinessPercent.innerHTML = currentWeatherData.clouds.all + ' %';

  const pressureValue = document.querySelector('.pressure-value');
  pressureValue.innerHTML = Math.round(
    currentWeatherData.main.pressure * 0.750063755419211
  );

  const visibilityValue = document.querySelector('.visibility-value');
  visibilityValue.innerHTML = Math.round(currentWeatherData.visibility / 1000);

  const windDirectionValue = document.querySelector('.wind-direction-value');
  const windDirectionDescription = document.querySelector(
    '.wind-direction-description'
  );
  const getDirection = (azimute) => {
    if (azimute < 22.5) return 'С';
    if (azimute < 67.5) return 'СВ';
    if (azimute < 112.5) return 'В';
    if (azimute < 157.5) return 'ЮВ';
    if (azimute < 202.5) return 'Ю';
    if (azimute < 247.5) return 'ЮЗ';
    if (azimute < 292.5) return 'З';
    if (azimute < 337.5) return 'СЗ';
    return 'С';
  };
  windDirectionValue.innerHTML = getDirection(currentWeatherData.wind.deg);
  windDirectionDescription.innerHTML = `Порывы ветра до ${Math.round(
    currentWeatherData.wind.gust
  )} м/с`;
}

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

async function getCurrentWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`;
  let currentWeatherData;
  await fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      currentWeatherData = obj;
    });
  return currentWeatherData;
}

async function getWeekWeatherData(lat, long, time) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&timezone=${time}&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=weathercode,temperature_2m,is_day`;
  let weekWeatherData;
  await fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      weekWeatherData = [obj.hourly, obj.daily];
    });
  return weekWeatherData;
}

function displayResults(weather) {
  console.log(JSON.stringify(weather));
}

void (async function () {
  await updateWeatherData('Красноярск');
})();

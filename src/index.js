const gap = 16,
  resetButton = document.getElementById("reset-button"),
  searchField = document.getElementById("search-field");

const hourlyWeatherCarousel = document.getElementById(
  "hourly-weather-carousel"
),
  hourlyWeatherContent = document.getElementById("hourly-weather-content"),
  hourlyWeatherNext = document.getElementById("hourly-weather-next"),
  hourlyWeatherPrevious = document.getElementById("hourly-weather-previous"),
  tommorowWeatherCarousel = document.getElementById(
    "tommorow-weather-carousel"
  ),
  tommorowWeatherContent = document.getElementById("tommorow-weather-content"),
  tommorowWeatherNext = document.getElementById("tommorow-weather-next"),
  tommorowWeatherPrevious = document.getElementById(
    "tommorow-weather-previous"
  ),
  weeklyWeatherCarousel = document.getElementById("weekly-weather-carousel"),
  weeklyWeatherContent = document.getElementById("weekly-weather-content"),
  weeklyWeatherNext = document.getElementById("weekly-weather-next"),
  weeklyWeatherPrevious = document.getElementById("weekly-weather-previous");

let width = hourlyWeatherCarousel.offsetWidth;
window.addEventListener(
  "resize",
  (e) => (width = hourlyWeatherCarousel.offsetWidth)
);

hourlyWeatherNext.addEventListener("click", (e) => {
  hourlyWeatherCarousel.scrollBy(width + gap, 0);
  if (hourlyWeatherCarousel.scrollWidth !== 0) {
    hourlyWeatherPrevious.style.display = "flex";
  }
  if (
    hourlyWeatherContent.scrollWidth - width - gap <=
    hourlyWeatherCarousel.scrollLeft + width
  ) {
    hourlyWeatherNext.style.display = "none";
  }
});
hourlyWeatherPrevious.addEventListener("click", (e) => {
  hourlyWeatherCarousel.scrollBy(-(width + gap), 0);
  if (hourlyWeatherCarousel.scrollLeft - width - gap <= 0) {
    hourlyWeatherPrevious.style.display = "none";
  }
  if (
    !hourlyWeatherContent.scrollWidth - width - gap <=
    hourlyWeatherCarousel.scrollLeft + width
  ) {
    hourlyWeatherNext.style.display = "flex";
  }
});

tommorowWeatherNext.addEventListener("click", (e) => {
  tommorowWeatherCarousel.scrollBy(width + gap, 0);
  if (tommorowWeatherCarousel.scrollWidth !== 0) {
    tommorowWeatherPrevious.style.display = "flex";
  }
  if (
    tommorowWeatherContent.scrollWidth - width - gap <=
    tommorowWeatherCarousel.scrollLeft + width
  ) {
    tommorowWeatherNext.style.display = "none";
  }
});
tommorowWeatherPrevious.addEventListener("click", (e) => {
  tommorowWeatherCarousel.scrollBy(-(width + gap), 0);
  if (tommorowWeatherCarousel.scrollLeft - width - gap <= 0) {
    tommorowWeatherPrevious.style.display = "none";
  }
  if (
    !tommorowWeatherContent.scrollWidth - width - gap <=
    tommorowWeatherCarousel.scrollLeft + width
  ) {
    tommorowWeatherNext.style.display = "flex";
  }
});

weeklyWeatherNext.addEventListener("click", (e) => {
  weeklyWeatherCarousel.scrollBy(width + gap, 0);
  if (weeklyWeatherCarousel.scrollWidth !== 0) {
    weeklyWeatherPrevious.style.display = "flex";
  }
  if (
    weeklyWeatherContent.scrollWidth - width - gap <=
    weeklyWeatherCarousel.scrollLeft + width
  ) {
    weeklyWeatherNext.style.display = "none";
  }
});
weeklyWeatherPrevious.addEventListener("click", (e) => {
  weeklyWeatherCarousel.scrollBy(-(width + gap), 0);
  if (weeklyWeatherCarousel.scrollLeft - width - gap <= 0) {
    weeklyWeatherPrevious.style.display = "none";
  }
  if (
    !weeklyWeatherContent.scrollWidth - width - gap <=
    weeklyWeatherCarousel.scrollLeft + width
  ) {
    weeklyWeatherNext.style.display = "flex";
  }
});

resetButton.onclick = function (e) {
  searchField.value = "";
};

function getDayOrNight() {
  //try using the dt in response.data
  let now = new Date();
  let hour = getHours();
  let day = "day";

  if (hour > 6 && hour < 18) {
    day = "day";
  } else if (hour < 7) {
    day = "night";
  } else if (hour > 17) {
    day = "night";
  }
}

/*------------Updating the weather Icons------------------------------------*/
function getAtmosphereIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");
  document.body.style.background = "url(media/foggyBg.jpg)";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";

  //compare description to set specific weather icons
  if (description === "tornado") {
    weatherIconMainElem.setAttribute("src", `./media/tornado.png`);
  } else if (description === "Smoke" || "volcanic ash" || "squalls") {
    weatherIconMainElem.setAttribute("src", `./media/smokeAshSqualls.png`);
  } else if (description === "mist" || "Haze" || "fog") {
    weatherIconMainElem.setAttribute("src", `./media/fogHazeMist.png`);
  } else if (description === "sand" || "dust" || "sand/ dust whirls") {
    weatherIconMainElem.setAttribute("src", `./media/dustSand.png`);
  }
}

function getThunderstormIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");
  document.body.style.background = "url(media/thunderstormBg.jpg)";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";

  //compare description to set specific weather icons
  if (
    description === "thunderstorm with light rain" ||
    "thunderstorm with rain" ||
    "thunderstorm with heavy rain" ||
    "thunderstorm with light drizzle" ||
    "thunderstorm with drizzle" ||
    "thunderstorm with heavy drizzle"
  ) {
    weatherIconMainElem.setAttribute("src", `./media/thunderRain.png`);
  } else if (
    description === "light thunderstorm" ||
    "thunderstorm" ||
    "ragged thunderstorm"
  ) {
    weatherIconMainElem.setAttribute("src", `./media/thunderstorm.png`);
  }
}

function getDrizzleIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");
  weatherIconMainElem.setAttribute("src", `./media/drizzle.png`);
  document.body.style.background = "url(media/rainBg.jpg)";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}

function getRainIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");
  document.body.style.background = "url(media/rainBg.jpg)";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";

  //compare description to set specific weather icons
  if (description === "light rain" || "moderate rain") {
    weatherIconMainElem.setAttribute("src", `./media/rain.png`);
  } else if (description === "freezing rain") {
    weatherIconMainElem.setAttribute("src", `./media/snowRain.png`);
  } else if (
    description === "heavy intensity rain" ||
    "very heavy rain" ||
    "extreme rain" ||
    "light intensity shower rain" ||
    "shower rain" ||
    "heavy intensity shower rain" ||
    "ragged shower rain"
  ) {
    weatherIconMainElem.setAttribute("src", `./media/rainShower.png`);
  }
}

function getSnowIcon(response) {
  let description = response.date.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");
  document.body.style.background = "url(media/snowBG.jpg)";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";

  //compare description to set specific weather icons
  if (description === "light snow" || "Snow" || "Heavy snow") {
    weatherIconMainElem.setAttribute("src", `./media/snow.png`);
  } else if (
    description === "Sleet" ||
    "Light shower sleet" ||
    "Shower sleet"
  ) {
    weatherIconMainElem.setAttribute("src", `./media/sleet.png`);
  } else if (
    description === "Light rain and snow" ||
    "Rain and snow" ||
    "Light shower snow" ||
    "Shower snow" ||
    "Heavy shower snow"
  ) {
    weatherIconMainElem.setAttribute("src", `./media/snowRain.png`);
  }
}

function getCloudsIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");
  document.body.style.background = "url(media/cloudsBg.jpg)";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";

  //compare description to set specific weather icons
  if (description === "few clouds") {
    weatherIconMainElem.setAttribute("src", `./media/fewClouds.png`);
  } else if (description === "scattered clouds") {
    weatherIconMainElem.setAttribute("src", `./media/scatteredClouds.png`);
  } else if (description === "broken clouds" || "overcast clouds") {
    weatherIconMainElem.setAttribute("src", `./media/clouds.png`);
  }
}

function getClearSkyIcon(response) {
  let weatherIconMainElem = document.querySelector("#weatherIconMain");
  weatherIconMainElem.setAttribute("src", `./media/clearSky.png`);
  document.body.style.background = "url(media/clearSky.jpg)";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}

function getMainWeather(response) {
  let main = response.data.weather[0].main;
  console.log(`get main weather ${main}`);
  return main;
}

function updateMainWeatherIcon(response) {
  let main = getMainWeather(response);
  console.log(`update main: main is ${main}`);

  //compare main weather description then call specific function
  if (main === "Clear") {
    getClearSkyIcon(response);
  } else if (main === "Clouds") {
    getCloudsIcon(response);
  } else if (main === "Snow") {
    getSnowIcon(response);
  } else if (main === "Rain") {
    getRainIcon(response);
  } else if (main === "Drizzle") {
    getDrizzleIcon(response);
  } else if (main === "Thunderstorm") {
    getThunderstormIcon(response);
  } else {
    getAtmosphereIcon(response);
  }
}

/*-----------------------------------------------------------*/
function getLocation(response) {
  let locationElement = document.querySelector("#location");
  let city = response.data.name;
  let country = response.data.sys.country;
  let location = `${city}, ${country}`;
  let timeZone = response.data.timezone;
  locationElement.innerHTML = `${location}`;
  console.log(response.data);
}

function getWeatherDescription(response) {
  let description = response.data.weather[0].description;
  let descriptionElem = document.querySelector(".weatherStatus");
  descriptionElem.innerHTML = `${description}`;
}

function getTemperature(response) {
  let temperatureElem = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElem.innerHTML = `${temperature}`;
  celsiusTemperature = response.data.main.temp;
}

function getFeelsLike(response) {
  let feelsLikeElem = document.querySelector("#feelsLike");
  let feelsLike = Math.round(response.data.main.feels_like);
  feelsLikeElem.innerHTML = `${feelsLike} °C`;
  feelsLikeC = feelsLike;
}

function getHumidity(response) {
  let humidityElem = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humidityElem.innerHTML = `${humidity}%`;
}

function getWindSpeed(response) {
  let windSpeedElem = document.querySelector("#windSpeed");
  let wind = Math.round(response.data.wind.speed * 3.6);
  windSpeedElem.innerHTML = `${wind} km/h`;
  windKmH = wind;
}

function getWeather(response) {
  getLocation(response);
  getWeatherDescription(response);
  getTemperature(response);
  getFeelsLike(response);
  getHumidity(response);
  getWindSpeed(response);
  updateMainWeatherIcon(response);
}

function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let location = document.querySelector("#location");

  //Condition for blank entries
  let input = searchInput.value.trim();
  if (input) {
    location.innerHTML = `Searching city...`;
  } else {
    location.innerHTML = null;
    alert("Please enter a city.");
  }

  let city = searchInput.value;
  let units = "metric";
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  //Get weather data
  axios.get(`${apiUrl}`).then(getWeather);

  //Clear the search bar after submission
  document.getElementById("search-form").reset();
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(getWeather);
}

function clickedCurrent() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

//Date format: Day, Month DD, YYYY
function getTodaysDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "Feburary",
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

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  return `${day}, ${month} ${date}, ${year}`;
}

//Time format: 12-hour period AM/PM
function getTimeNow() {
  let now = new Date();
  let hour = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");
  let meridiem = "";

  if (hour < 12) {
    meridiem = "AM";
  } else if (hour === 12) {
    meridiem = "PM";
  } else if (hour === 24) {
    hour = hour - 12;
    meridiem = "AM";
  } else {
    hour = hour - 12;
    meridiem = "PM";
  }

  if (hour === 0) {
    hour = 12;
  }
  let time = `${hour}:${minutes}:${seconds} ${meridiem}`;
  timeNow.innerHTML = `${time}`;

  //Performs function for a 'live clock'
  let t = setTimeout(function () {
    getTimeNow();
  }, 1000);
}

//Greeting format: Morning 12AM-11AM, Afternoon 12PM-5PM, Evening 6PM-11PM
function getGreeting(now) {
  let hour = now.getHours();
  let greeting = "";
  let image = document.querySelector("#greetingIcon");

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon";
    image.setAttribute("src", `./media/afternoon.png`);
  } else if (hour > 17 && hour < 24) {
    greeting = "Good Evening";
    image.setAttribute("src", `./media/evening.png`);
  } else {
    greeting = "Good Morning";
    image.setAttribute("src", `./media/afternoon.pgn`);
  }
  return `${greeting}`;
}

/*Fahrenheit/Celsisu function
(17) in Celsius and add link to covert it to Fahrenheit. When clicking 
on it, it should covert the temperature to Fahrenheit. When clicking on 
Celsius, it should convert it back to Celsius*/

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitElem = document.querySelector("#temperature");
  fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  fahrenheitElem.innerHTML = fahrenheitTemp;

  celsiusBttn.classList.remove("active");
  fahrenheitBttn.classList.add("active");
  celsiusBttn.style.color = "rgb(154, 81, 177)";
  fahrenheitBttn.style.color = "black";
  fahrenheitBttn.style.fontWeight = "bold";
  celsiusBttn.style.fontWeight = "400";

  let feelsLikeFElem = document.querySelector("#feelsLike");
  let feelsLikeF = Math.round((feelsLikeC * 9) / 5 + 32);
  feelsLikeFElem.innerHTML = `${feelsLikeF} °F`;

  let windSpeed = document.querySelector("#windSpeed");
  let windMph = Math.round(windKmH / 1.609344);
  windSpeed.innerHTML = `${windMph} mph`;
}

function displayCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temperature");
  celsius.innerHTML = Math.round(celsiusTemperature);

  celsiusBttn.classList.add("active");
  fahrenheitBttn.classList.remove("active");
  fahrenheitBttn.style.color = "rgb(154, 81, 177)";
  celsiusBttn.style.color = "black";
  celsiusBttn.style.fontWeight = "bold";
  fahrenheitBttn.style.fontWeight = "400";

  let feelsLikeCElem = document.querySelector("#feelsLike");
  feelsLikeCElem.innerHTML = `${feelsLikeC} °C`;

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `${windKmH} km/h`;
}

//Current date
let now = new Date();
let dateToday = document.querySelector("#date-today");
dateToday.innerHTML = getTodaysDate(now);

//Current time
let timeNow = document.querySelector("#time-now");
getTimeNow();

//Greeting based off local time
let greeting = document.querySelector("#greeting");
greeting.innerHTML = getGreeting(now);

//Current location button
let currentLocationBttn = document.querySelector("#currentLocationBttn");
currentLocationBttn.addEventListener("click", clickedCurrent);

//Fahrenheit Button
let celsiusTemperature = null;
let windKmH = null;
let feelsLikeC = null;
let fahrenheitBttn = document.querySelector("#fahrenheit-link");
fahrenheitBttn.addEventListener("click", displayFahrenheit);

//Celsius Button
let celsiusBttn = document.querySelector("#celsius-link");
celsiusBttn.addEventListener("click", displayCelsius);

//Search Engine
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchLocation);

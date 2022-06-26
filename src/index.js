//--------------------------------------TEST ZONE START-----------------------------------//

function getMonth(nd) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[nd.getMonth()];
  return month;
}

function getDay(nd) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let day = days[nd.getDay()];
  return day;
}

//------------------------------------------------------------------------------------------------------------//

//Format time displayed on page
function formatHourlyTime(t) {
  let dateTimeArr = t.trim().split(/\s+/);
  let getTime = dateTimeArr[1];
  let timeArr = getTime.trim().split(":");
  let hour = timeArr[0];
  let min = timeArr[1];
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
  let time = `${hour}:${min} ${meridiem}`;

  return time;
}

//Formats city's date time: YYYY-mm-DD hr:min (hr:00) for iteration conditions
function formatCityDateTime(response) {
  let lastUpdate = response.data.current.last_updated;
  let arr = lastUpdate.trim().split(/\s+/);
  let lastUpdateDate = arr[0];
  let lastUpdateTime = arr[1];
  arr2 = lastUpdateTime.trim().split(":");
  arr2.splice(1, 1, "00");
  let cityDate = lastUpdateDate.toString();
  let cityTimeHr = arr2.join(":").toString();
  let cityDateTime = `${cityDate} ${cityTimeHr}`;
  return cityDateTime;
}

function displayHourlyWeather(response) {
  //console.log(`date time ${dateTime}`);
  console.log(`this is history data`);
  console.log(response);
  let cityDateTime = formatCityDateTime(response);
  console.log(`cityDateTime ${cityDateTime}`);

  //Manage inner HTML for hourly weather forecast
  let hourlyForecastElem = document.querySelector("#hourly-Forecast");
  let hourlyForecastHTML = `<div class="card p-1 m-1 bg-card-details">
                    <table>
                      <thead>
                        <tr>
                          <th>
                          Time
                          </th>
                          <th> Condition</th>
                          <th> Temp</th>
                          <th> Humdity</th>
                          <th> Wind</th>
                        </tr>
                        <tbody>`;

  let hourlyForecast = response.data.forecast.forecastday[0].hour;
  //Iterate through first day to find match time and date, get index//
  //console.log(hourlyForecast.forecastday[0].hour[0]);
  let indexFlag = false;
  let counter = 0;

  hourlyForecast.forEach(function (forecast, index) {
    //console.log(cityDateTime);
    if (indexFlag === true && counter < 6) {
      console.log(`counter: ${counter}`);
      console.log(`indexFlagged- index:${index}`);
      counter = counter + 1;
      //Manage the data for hourly data

      hourlyForecastHTML =
        hourlyForecastHTML +
        `<tr>
                      <td class="hourlyTime">${formatHourlyTime(
                        forecast.time
                      )}</td>
                      <td class="hourlyDescription">⛅${
                        forecast.condition.text
                      }</td>
                      <td class="hourlyTemp">${Math.round(
                        forecast.temp_c
                      )}°C</td>
                      <td class="hourlyHumdity">${forecast.humidity}%</td>
                      <td class="hourlyWindSpeed">${Math.round(
                        forecast.wind_kph
                      )}km/h</td>
                    </tr>`;
    }

    if (forecast.time === cityDateTime) {
      console.log(`index: ${index}`);
      console.log(forecast.time);
      console.log(`I found it`);
      indexFlag = true;
    }
  });

  //Get index and iterate to display data
  /*  indexFlag = indexFlag + 1;
  hourlyForecastDay1.forEach(function (forecastday1, index) {
    if (index > indexFlag && counter < 4) {
      
      counter = counter + 1;
    } else {
      //next
    }
  });

  //End of iterations
*/ //closing inner html data
  hourlyForecastHTML =
    hourlyForecastHTML +
    `       </tbody>
          </thead>
        </table>
      </div>
     </div>`;
  hourlyForecastElem.innerHTML = hourlyForecastHTML;
}

//Utilizes api from weatherapi for hourly weather data
function getHourlyData(lattitude, longitude) {
  let lat = lattitude;
  let lon = longitude;
  let apiKey = "15c74ef636a145179c8223450222506";
  apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=2&aqi=no&alerts=no
`;
  axios.get(apiUrl).then(displayHourlyWeather);
}
//-------------------------------------------------------------------------------------------------------------//

function displayCityTime(nd) {
  let hr = String(nd.getHours()).padStart(2, "0");
  let min = String(nd.getMinutes()).padStart(2, "0");
  console.log(`display city time: ${hr}:${min}`);

  //___________________add inner HTML here
}

function displayCityDate(nd) {
  let day = getDay(nd);
  let month = getMonth(nd);
  let date = nd.getDate();
  let year = nd.getFullYear();
  console.log(`display city date: ${month} ${date}, ${year}`);
  //___________________add inner HTML here
}

function calculateUTC(localTime, localOffset) {
  let utc = localTime + localOffset * 60000;
  return utc;
}

function getLocalTimezoneOffset() {
  let now = new Date();
  let localOffset = now.getTimezoneOffset();
  return localOffset;
}

function getLocalTime() {
  let now = new Date();
  let localTime = now.getTime();
  let lt = new Date(localTime);
  console.log(`lt: ${lt}`);
  return localTime;
}

//Notes--open weather timezone is in seconds
function calculateCityTime(response) {
  //Calculates city's time
  let localTime = getLocalTime();
  let localOffset = getLocalTimezoneOffset();
  let utc = calculateUTC(localTime, localOffset);
  let cityTimezoneOffset = response.data.timezone_offset;
  let cityTime = utc + 1000 * cityTimezoneOffset;
  let nd = new Date(cityTime);
  let lat = response.data.lat;
  let lon = response.data.lon;
  //display data on page
  displayCityDate(nd);
  displayCityTime(nd);
  getHourlyData(lat, lon);
}

//--------------------------------------TEST ZONE END------------------------------------//

function getHourlyForecast(response) {
  //console.log("this is the get hourly function");
  let lattitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&exclude=minutely,weekly,alerts&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(calculateCityTime);
}
/*----------------------------------------------------------------------------------------------------------------------*/

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

//Handles event when Fahrenheit button is clicked
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

//Handles event when Celsius button is clicked
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

//----------------------------------------------------------------------------------------------------------------------//

//Handles & displays the weekly forecast weather icon images
function updateWeatherIcon(main) {
  // console.log(`main is ${main}`);
  let imgSrc = "";

  //compare main weather description then call specific function
  if (main === "Clear") {
    imgSrc = "clearSky";
  } else if (main === "Clouds") {
    imgSrc = "clouds";
  } else if (main === "Snow") {
    imgSrc = "snow";
  } else if (main === "Rain") {
    imgSrc = "rain";
  } else if (main === "Drizzle") {
    gmgSrc = "drizzle";
  } else if (main === "Thunderstorm") {
    imgSrc = "thunderstorm";
  } else {
    imgSrc = "dustSand";
  }
  return imgSrc;
}

//Formats the min temp
function formatMinTemp(minTemp) {
  return Math.round(minTemp);
}
//Formats the max temp
function formatMaxTemp(maxTemp) {
  return Math.round(maxTemp);
}

//Formats the 'dt' data to display the day & date of the Weekly Forecast
function formatDT(timestamp) {
  let now = new Date(timestamp * 1000);
  let day = now.getDay();
  let date = now.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return `${days[day]} ${date}`;
}

//Displays the weekly forecast; several function calls to format temps and display weather icon
function displayWeeklyForecast(response) {
  let weeklyForecastElem = document.querySelector("#weekly-Forecast");
  // console.log(response.data.daily);
  let forecast = response.data.daily;
  console.log(`jsesgss`);
  console.log(forecast);
  let weeklyForecastHTML = `<div class="row m-1 pb-3">`;
  forecast.forEach(function (forecastDay, index) {
    if (index === 0) {
      //do nothing
    } else if (index < 7) {
      weeklyForecastHTML =
        weeklyForecastHTML +
        `
      <div class="col-sm-2 p-0">
        <div class="card m-1 p-2 h-100 bg-card-details">
          <div class="forecast-date p-0">${formatDT(forecastDay.dt)}
          </div>
          
          <img src="./media/${updateWeatherIcon(
            forecastDay.weather[0].main
          )}.png" class="forecast-icon" id="forecast-icon" alt="weekly forecast weather Icon">
          <div>
          <span class="forecast-max-temp">${formatMaxTemp(
            forecastDay.temp.max
          )}°</span> | 
          <span class="forecast-min-temp">${formatMinTemp(
            forecastDay.temp.min
          )}°</span>
          </div>
        </div>
      </div>
      `;
    }
  });

  weeklyForecastHTML = weeklyForecastHTML + `</div>`;
  weeklyForecastElem.innerHTML = weeklyForecastHTML;
}

//Gets the weekly forecast, utilizes location coordinates and one call api from open weather map
function getWeeklyForecast(response) {
  // console.log(response.data);
  let lattitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayWeeklyForecast);
}

/*----------------------------------------------Updates the Current Weather Icon----------------------------------------*/
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

//Gets 'main' weather description
function getMainWeather(response) {
  let main = response.data.weather[0].main;
  //console.log(`get main weather ${main}`);
  return main;
}

//-----------------------Collection of function calls to display the Current Weather Icon------------------------//
function updateMainWeatherIcon(response) {
  let main = getMainWeather(response);
  //console.log(`update main: main is ${main}`);

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

//Get & display the wind speed (default in km/h)
function getWindSpeed(response) {
  let windSpeedElem = document.querySelector("#windSpeed");
  let wind = Math.round(response.data.wind.speed * 3.6);
  windSpeedElem.innerHTML = `${wind} km/h`;
  windKmH = wind;
}

//Get & display the humidity
function getHumidity(response) {
  let humidityElem = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humidityElem.innerHTML = `${humidity}%`;
}

//Get & display the "feels like" temperature (defualt in Celsius)
function getFeelsLike(response) {
  let feelsLikeElem = document.querySelector("#feelsLike");
  let feelsLike = Math.round(response.data.main.feels_like);
  feelsLikeElem.innerHTML = `${feelsLike} °C`;
  feelsLikeC = feelsLike;
}

//Get & display the temperature (default in Celsius)
function getTemperature(response) {
  let temperatureElem = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElem.innerHTML = `${temperature}`;
  celsiusTemperature = response.data.main.temp;
}

//Get & display the weather forecast description
function getWeatherDescription(response) {
  let description = response.data.weather[0].description;
  let descriptionElem = document.querySelector(".weatherStatus");
  descriptionElem.innerHTML = `${description}`;
}

//Get & display the location
function getLocation(response) {
  let locationElement = document.querySelector("#location");
  let city = response.data.name;
  let country = response.data.sys.country;
  let location = `${city}, ${country}`;
  let timeZone = response.data.timezone;
  locationElement.innerHTML = `${location}`;
  console.log(response.data);
  return city;
}

//---------------------Collection of function calls to display the weather forecast----------------------------------//
function getWeather(response) {
  getLocation(response);
  getWeatherDescription(response);
  getTemperature(response);
  getFeelsLike(response);
  getHumidity(response);
  getWindSpeed(response);
  updateMainWeatherIcon(response);
  getHourlyForecast(response);
  getWeeklyForecast(response);
}

//Handles user's input, checks if entry is valid, then gets weather if valid or displays error message
function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let location = document.querySelector("#location");

  //Conditions for blank entries
  let input = searchInput.value.trim();
  if (input) {
    location.innerHTML = `Searching city...`;

    //------------------consider an invalid city search here-------------------------------//
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

//Sets and utilizes user's location coordinates to get weather forecast
function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  //Get weather data
  axios.get(`${apiUrl}`).then(getWeather);
}

//Handles "Check my location" button action to get user's location coordinates
function clickedCurrent() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

//Displays default weather based on specific city provided
function displayDefaultWeather(city) {
  let units = "metric";
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  //Get weather data
  axios.get(`${apiUrl}`).then(getWeather);
}

/*----------------------------------------------------------------------------------------------*/

//Display user's local date
let now = new Date();
let dateToday = document.querySelector("#date-today");
dateToday.innerHTML = getTodaysDate(now);

//Display user's local time
let timeNow = document.querySelector("#time-now");
getTimeNow();

//Greeting message displayed based off user's local time
let greeting = document.querySelector("#greeting");
greeting.innerHTML = getGreeting(now);

//Fahrenheit button clicked event
let celsiusTemperature = null;
let windKmH = null;
let feelsLikeC = null;
let fahrenheitBttn = document.querySelector("#fahrenheit-link");
fahrenheitBttn.addEventListener("click", displayFahrenheit);

//Celsius button clicked event
let celsiusBttn = document.querySelector("#celsius-link");
celsiusBttn.addEventListener("click", displayCelsius);

//Search Engine Form Submission
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchLocation);

//Current location button clicked event
let currentLocationBttn = document.querySelector("#currentLocationBttn");
currentLocationBttn.addEventListener("click", clickedCurrent);

//Default display upon loading page
displayDefaultWeather("Guam");

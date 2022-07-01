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

  return `Today is ${day}, ${month} ${date}, ${year}`;
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
  let time = `${hour}:${minutes}:${seconds}${meridiem}`;
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
//---------------------------------------------------------------------------------------------------------------//

//display weekly fahrenheit forecast (activates when button clicked)
function weeklyFahrenheit() {
  for (i = 0; i < weeklyMaxCel.length; i++) {
    //Calculate kax fahrenheit
    let calcMaxFah = (weeklyMaxCel[i] * 9) / 5 + 32;
    calcMaxFah = Math.round(calcMaxFah);
    weeklyMaxFah[i] = calcMaxFah;

    //Calc min fahrenheit
    let calcMinFah = (weeklyMinCel[i] * 9) / 5 + 32;
    calcMinFah = Math.round(calcMinFah);
    weeklyMinFah[i] = calcMinFah;
  }
  //Display weekly Fahrenheit forecast
  let weeklyForecastElem = document.querySelector("#weekly-Forecast");
  let weeklyForecastHTML = `<div class="row m-1 pb-3">`;
  for (i = 0; i < weeklyDT.length; i++) {
    weeklyForecastHTML =
      weeklyForecastHTML +
      `
      <div class="col-sm-2 p-0">
        <div class="card m-1 p-2 h-100 bg-card-details">
          <div class="forecast-date p-0">${weeklyDT[i]}
          </div>
          
          <img src="./media/${weeklyImgSrc[i]}.png" class="forecast-icon" id="forecast-icon" alt="weekly forecast weather Icon">
          <div>
          <span class="forecast-max-temp">${weeklyMaxFah[i]}°</span> | 
          <span class="forecast-min-temp">${weeklyMinFah[i]}°</span>
          </div>
        </div>
      </div>
      `;
  }
  //Close inner html element
  weeklyForecastHTML = weeklyForecastHTML + `</div>`;
  weeklyForecastElem.innerHTML = weeklyForecastHTML;
}

//Displays weekly celsius forecast (default)
function weeklyCelsius() {
  let weeklyForecastElem = document.querySelector("#weekly-Forecast");
  let weeklyForecastHTML = `<div class="row m-1 pb-3">`;
  for (i = 0; i < weeklyDT.length; i++) {
    weeklyForecastHTML =
      weeklyForecastHTML +
      `
      <div class="col-sm-2 p-0">
        <div class="card m-1 p-2 h-100 bg-card-details">
          <div class="forecast-date p-0">${weeklyDT[i]}
          </div>
          
          <img src="./media/${weeklyImgSrc[i]}.png" class="forecast-icon" id="forecast-icon" alt="weekly forecast weather Icon">
          <div>
          <span class="forecast-max-temp">${weeklyMaxCel[i]}°</span> | 
          <span class="forecast-min-temp">${weeklyMinCel[i]}°</span>
          </div>
        </div>
      </div>
      `;
  }
  //Close inner html element
  weeklyForecastHTML = weeklyForecastHTML + `</div>`;
  weeklyForecastElem.innerHTML = weeklyForecastHTML;
}

function hrlyCelsius() {
  let hourlyForecastElem = document.querySelector("#hourly-Forecast");
  //Manages inner html for hourly forecast
  let hourlyForecastHTML = `<div class="card p-1 m-1 bg-card-details">
                    <table style="width:100%">
                      <thead>
                        <tr>
                          <th style="width:10%">Time</th>                          
                          <th style="width:25%" class="conditionHeader"> Condition</th>
                          <th  style="width:8%" class="tempHeader"> Temp</th>
                          <th  style="width:8%" class="humdityHeader"> Humdity</th>
                          <th  style="width:8%" class="windHeader"> Wind</th>
                        </tr>
                        <tbody>`;
  //Interate through loop
  for (i = 0; i < hourlyTime.length; i++) {
    //Manage the data for hourly data
    hourlyForecastHTML =
      hourlyForecastHTML +
      `<tr>
                      <td class="hourlyTime">${hourlyTime[i]}</td>
                      <td class="hourlyDescription"><img
                        src="./media/${hourlyImgSrc[i]}.png"
                        class="hourly-icon"
                        id="hourly-icon"
                        alt="weekly forecast weather Icon"
                      /> ${hourlyCondition[i]}</td>
                      <td class="hourlyTemp">${hourlyCelsius[i]}</td>
                      <td class="hourlyHumdity">${hourlyHumdity[i]}</td>
                      <td class="hourlyWindSpeed">${hourlyKMH[i]}</td>
                    </tr>`;
  }
  //closing inner html data
  hourlyForecastHTML =
    hourlyForecastHTML +
    `       </tbody>
          </thead>
        </table>
      </div>
     </div>`;
  hourlyForecastElem.innerHTML = hourlyForecastHTML;
}

function hrlyFahrenheit() {
  let hourlyForecastElem = document.querySelector("#hourly-Forecast");
  //Manages inner html for hourly forecast
  let hourlyForecastHTML = `<div class="card p-1 m-1 bg-card-details">
                    <table style="width:100%">
                      <thead>
                        <tr>
                          <th style="width:10%">Time</th>                          
                          <th style="width:25%" class="conditionHeader"> Condition</th>
                          <th  style="width:8%" class="tempHeader"> Temp</th>
                          <th  style="width:8%" class="humdityHeader"> Humdity</th>
                          <th  style="width:8%" class="windHeader"> Wind</th>
                        </tr>
                        <tbody>`;
  //Interate through loop
  for (i = 0; i < hourlyTime.length; i++) {
    //Manage the data for hourly data
    hourlyForecastHTML =
      hourlyForecastHTML +
      `<tr>
                      <td class="hourlyTime">${hourlyTime[i]}</td>
                      <td class="hourlyDescription"><img
                        src="./media/${hourlyImgSrc[i]}.png"
                        class="hourly-icon"
                        id="hourly-icon"
                        alt="weekly forecast weather Icon"
                      /> ${hourlyCondition[i]}</td>
                      <td class="hourlyTemp">${hourlyFahrenheit[i]}</td>
                      <td class="hourlyHumdity">${hourlyHumdity[i]}</td>
                      <td class="hourlyWindSpeed">${hourlyMPH[i]}</td>
                    </tr>`;
  }
  //closing inner html data
  hourlyForecastHTML =
    hourlyForecastHTML +
    `       </tbody>
          </thead>
        </table>
      </div>
     </div>`;
  hourlyForecastElem.innerHTML = hourlyForecastHTML;
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

//----------^^^^^ Celsius/Fahrenheit ^^^^^////vvvv Updates Main/Current Weather Icon vvvvv-----------------//

function getAtmosphereIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");
  document.body.style.background = "url(media/foggyBg.jpg)";

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
}

function getRainIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");
  document.body.style.background = "url(media/rainBg.jpg)";

  //compare description to set specific weather icons
  if (description === "light rain" || "moderate rain") {
    weatherIconMainElem.setAttribute("src", `./media/rainShower.png`);
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
}

//----------^^^^^ Updates Main/Current Weather ICON ^^^^^////vvvv Weekly Forecast vvvvv-----------------//

//Handles & displays the weekly forecast weather icon images
function updateWeatherIcon(main) {
  let imgSrc = "";

  //compare main weather description then call specific function
  if (main === "Clear") {
    imgSrc = "clearSky";
  } else if (main === "Clouds") {
    imgSrc = "clouds";
  } else if (main === "Snow") {
    imgSrc = "snow";
  } else if (main === "Rain") {
    imgSrc = "rainShower";
  } else if (main === "Drizzle") {
    gmgSrc = "drizzle";
  } else if (main === "Thunderstorm") {
    imgSrc = "thunderstorm";
  } else {
    imgSrc = "dustSand";
  }
  return imgSrc;
}

//Formats the 'dt' data to display the day & date of the Weekly Forecast
function formatDT(timestamp) {
  let now = new Date(timestamp * 1000);
  let day = now.getDay();
  let date = String(now.getDate()).padStart(2, "0");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return `${days[day]} ${date}`;
}

//Displays the weekly forecast; several function calls to format temps and display weather icon
function formatWeeklyForecast(response) {
  let weeklyForecastElem = document.querySelector("#weekly-Forecast");
  let forecast = response.data.daily;
  let weeklyForecastHTML = `<div class="row m-1 pb-3">`;
  let counter = 0;
  forecast.forEach(function (forecastDay, index) {
    if (index === 0) {
      //do nothing
    } else if (index > 0 && index < 7) {
      weeklyDT[counter] = `${formatDT(forecastDay.dt)}`;
      weeklyImgSrc[counter] = `${updateWeatherIcon(
        forecastDay.weather[0].main
      )}`;
      weeklyMaxCel[counter] = Math.round(forecastDay.temp.max);
      weeklyMinCel[counter] = Math.round(forecastDay.temp.min);
      counter = counter + 1;
    }
  });

  //display weekly celsius data
  weeklyCelsius();
}

//Gets the weekly forecast, utilizes location coordinates and one call api from open weather map
function getWeeklyForecast(response) {
  let lattitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(formatWeeklyForecast);
}

//-------------------^^^^^ Weekly Forecast ^^^^^////vvvv Hourly Forecast vvvvv--------------------------//

function updateHourlyWeatherIcon(code) {
  let imgSrc = "";
  //compare main weather description then call specific function
  if (code === 1000) {
    imgSrc = "clearSky";
  } else if (code === 1003) {
    imgSrc = "fewClouds";
  } else if (code === 1006) {
    imgSrc = "clouds";
  } else if (code === 1009) {
    imgSrc = "scatteredClouds";
  } else if (code === 1030 || code === 1135 || code === 1147) {
    imgSrc = "fogHazeMist";
  } else if (
    code === 1114 ||
    code === 1210 ||
    code === 1213 ||
    code === 1219 ||
    code === 1222 ||
    code === 1225
  ) {
    imgSrc = "snow";
  } else if (
    code === 1066 ||
    code === 1117 ||
    code === 1198 ||
    code === 1201 ||
    code === 1255 ||
    code === 1258
  ) {
    imgSrc = "snowRain";
  } else if (
    code === 1168 ||
    code === 1171 ||
    code === 1237 ||
    code === 1261 ||
    code === 1264
  ) {
    imgSrc = "freezing";
  } else if (code === 1063 || code === 1180 || code === 1183 || code === 1186) {
    imgSrc = "rain";
  } else if (
    code === 1150 ||
    code === 1153 ||
    code === 1189 ||
    code === 1192 ||
    code === 1195 ||
    code === 1240 ||
    code === 1243 ||
    code === 1246
  ) {
    imgSrc = "rainShower";
  } else if (code === 1072 || code === 1068) {
    imgSrc = "drizzle";
  } else if (
    code === 1069 ||
    code === 1204 ||
    code === 1207 ||
    code === 1249 ||
    code === 1252
  ) {
    imgSrc = "sleet";
  } else if (code === 1087 || code === 1279 || code === 1282) {
    imgSrc = "thunderstorm";
  } else if (code === 1273 || code === 1276) {
    imgSrc = "thunderRain";
  } else {
    imgSrc = "dustSand";
  }
  return imgSrc;
}

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
  if (hour == 00) {
    hour = 12;
  }
  let time = `${hour}:${min}${meridiem}`;
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

//Gets hourly forecast and store into arrays, then calls function to display C output
function formatHrCityData(response) {
  //display country
  let regionElem = document.querySelector("#region");
  let region = response.data.location.region;
  region = `${region} `;
  regionElem.innerHTML = region;
  let cityDateTime = formatCityDateTime(response);

  //Iterate through first day to find match time and date, get index/
  let hourlyForecast = response.data.forecast.forecastday[0].hour;
  let indexFlag = false;
  let counter = 0;

  //Interate through first day
  hourlyForecast.forEach(function (forecast, index) {
    //Iterate through after finding the index of city's time - want the hour after the current city time
    if (indexFlag === true && counter < 6 && forecast.time != cityDateTime) {
      //Store each data into an array
      hourlyTime[counter] = `${formatHourlyTime(forecast.time)}`;
      hourlyImgSrc[counter] = `${updateHourlyWeatherIcon(
        forecast.condition.code
      )}`;
      hourlyCondition[counter] = `${forecast.condition.text}`;
      hourlyCelsius[counter] = `${Math.round(forecast.temp_c)}°C`;
      hourlyFahrenheit[counter] = `${Math.round(forecast.temp_f)}°F`;
      hourlyHumdity[counter] = `${forecast.humidity}%`;
      hourlyKMH[counter] = `${Math.round(forecast.wind_kph)} km/h`;
      hourlyMPH[counter] = `${Math.round(forecast.wind_mph)} mph`;
      counter = counter + 1;
    }
    //Find index with city's current date-time, set index flag if found match
    if (forecast.time === cityDateTime) {
      indexFlag = true;
    }
  });

  let hourlyForecast1 = response.data.forecast.forecastday[1].hour;
  //Iterate through following day, if hourly data index reaches 23 (end of day)
  if (counter < 6) {
    hourlyForecast1.forEach(function (forecast, index) {
      if (indexFlag === true && counter < 6) {
        hourlyTime[counter] = `${formatHourlyTime(forecast.time)}`;
        hourlyImgSrc[counter] = `${updateHourlyWeatherIcon(
          forecast.condition.code
        )}`;
        hourlyCondition[counter] = `${forecast.condition.text}`;
        hourlyCelsius[counter] = `${Math.round(forecast.temp_c)}°C`;
        hourlyFahrenheit[counter] = `${Math.round(forecast.temp_f)}°C`;
        hourlyHumdity[counter] = `${forecast.humidity}%`;
        hourlyKMH[counter] = `${Math.round(forecast.wind_kph)}km/h`;
        hourlyMPH[counter] = `${Math.round(forecast.wind_mph)}mph`;
        counter = counter + 1;
      }
    });
  }
  //display hourly forecast (default in celsius)
  hrlyCelsius();
}

//Utilizes api from weatherapi for hourly weather data
function getHrCityData(lattitude, longitude) {
  let lat = lattitude;
  let lon = longitude;
  let apiKey = "15c74ef636a145179c8223450222506";
  apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=2&aqi=no&alerts=no
`;
  axios.get(apiUrl).then(formatHrCityData);
}

function displayCityTime(nd) {
  let hr = String(nd.getHours()).padStart(2, "0");
  let min = String(nd.getMinutes()).padStart(2, "0");
  let meridiem = "";

  if (hr < 12) {
    meridiem = "AM";
  } else if (hr === 12) {
    meridiem = "PM";
  } else if (hr === 24) {
    hr = hr - 12;
    meridiem = "AM";
  } else {
    hr = hr - 12;
    meridiem = "PM";
  }
  if (hr == 00) {
    hr = 12;
  }

  //update inner html to display city's time
  let locationTime = `${hr}:${min}${meridiem}`;
  let locationTimeElem = document.querySelector("#location-Time");
  locationTimeElem.innerHTML = locationTime;
}

function displayCityDate(nd) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let day = days[nd.getDay()];

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
  let date = String(nd.getDate()).padStart(2, "0");
  let year = nd.getFullYear();

  //update inner html to display city's date
  let locationDate = `${day}, ${month} ${date}, ${year}`;
  let locationDateElem = document.querySelector("#location-Date");
  locationDateElem.innerHTML = locationDate;
}

//Notes--open weather timezone is in seconds
function calculateCityTime(response) {
  //Calculates city's time
  let now = new Date();
  let localTime = now.getTime();
  let lt = new Date(localTime);
  let localOffset = now.getTimezoneOffset();
  let utc = localTime + localOffset * 60000;
  let cityTimezoneOffset = response.data.timezone_offset;
  let cityTime = utc + 1000 * cityTimezoneOffset;
  let nd = new Date(cityTime);
  let lat = response.data.lat;
  let lon = response.data.lon;
  //display data on page
  displayCityDate(nd);
  displayCityTime(nd);
  getHrCityData(lat, lon);
}

function getHourlyForecast(response) {
  let lattitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&exclude=minutely,weekly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(calculateCityTime);
}

//--------------^^^^^ Hourly Forecast ^^^^^////vvvv Update Main/Current Forecast vvvvv------------------//

function updateMainWeatherIcon(response) {
  let main = response.data.weather[0].main;

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
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Get & display the weather forecast description
function getWeatherDescription(response) {
  let description = response.data.weather[0].description;
  description = capitalizeFirstLetter(description);
  let descriptionElem = document.querySelector(".weatherStatus");
  descriptionElem.innerHTML = `${description}`;
}

//Get & display the location
function getLocation(response) {
  let locationElement = document.querySelector("#location");
  let countryElem = document.querySelector("#country");
  let city = response.data.name;
  let location = `${city}`;
  let country = response.data.sys.country;
  let timeZone = response.data.timezone;
  locationElement.innerHTML = `${location}`;
  countryElem.innerHTML = country;
  return city;
}
//---^^^ Update Main/Current Forecast ^^^//vvv Collection of function call to display forecast vvv---//

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
  let country = document.querySelector("#country");

  //Conditions for blank entries
  let input = searchInput.value.trim();
  if (input) {
    location.innerHTML = ` `;
    country.innerHTML = ` `;
  } else {
    location.innerHTML = null;
    alert("Please enter a city name.");
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

/*-------------------------------------------------------------------------------------------------------------------------*/

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

//Handling C/F button events variables
let celsiusTemperature = null;
let windKmH = null;
let feelsLikeC = null;

let hourlyTime = new Array();
let hourlyCelsius = new Array();
let hourlyFahrenheit = new Array();
let hourlyImgSrc = new Array();
let hourlyCondition = new Array();
let hourlyHumdity = new Array();
let hourlyKMH = new Array();
let hourlyMPH = new Array();

let weeklyDT = new Array();
let weeklyImgSrc = new Array();
let weeklyMaxCel = new Array();
let weeklyMinCel = new Array();
let weeklyMaxFah = new Array();
let weeklyMinFah = new Array();

//Fahrenheit button clicked event
let fahrenheitBttn = document.querySelector("#fahrenheit-link");
fahrenheitBttn.addEventListener("click", displayFahrenheit);
fahrenheitBttn.addEventListener("click", hrlyFahrenheit);
fahrenheitBttn.addEventListener("click", weeklyFahrenheit);

//Celsius button clicked event
let celsiusBttn = document.querySelector("#celsius-link");
celsiusBttn.addEventListener("click", displayCelsius);
celsiusBttn.addEventListener("click", hrlyCelsius);
celsiusBttn.addEventListener("click", weeklyCelsius);

//Search Engine Form Submission
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchLocation);

//Current location button clicked event
let currentLocationBttn = document.querySelector("#currentLocationBttn");
currentLocationBttn.addEventListener("click", clickedCurrent);

//Default display upon loading page
displayDefaultWeather("Hagåtña");

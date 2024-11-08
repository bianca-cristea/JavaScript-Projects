const form = document.querySelector(".form");
const info = document.querySelector(".info");
const submitBtn = document.querySelector("#submit");
const cityInput = document.querySelector(".cityInput");

const temperatureDisplayed = document.querySelector(".temperature");
const humidityDisplayed = document.querySelector(".humidity");
const descriptionDisplayed = document.querySelector("description");
const weatherEmojiDisplayed = document.querySelector(".weatherEmoji");
const cityDisplayed = document.querySelector(".city");

const apiKey = "";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      console.log(weatherData);
      displayWeatherData(weatherData);
      info.style.visibility = "visible";
    } catch (error) {
      console.error(error);
      displayError(error.message);
    }
  } else {
    displayError("Please enter a city.");
  }
});

const getWeatherData = async (city) => {
  const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

//the data will be in json format
const displayWeatherData = (data) => {
  info.innerHTML = `<p class="temperature">${Math.floor(
    data.list[0].main.temp - 273.15
  )}*C</p>
                               <p class="humidity">Humidity: ${
                                 data.list[0].main.humidity
                               }%</p>
                               <p class="description">${
                                 data.list[0].weather[0].description
                               }</p> 
                              <img src="https://openweathermap.org/img/wn/${
                                data.list[0].weather[0].icon
                              }.png"/>

                               <h1 class="city">${data.city.name}</h1>`;
};

const getWeatherEmoji = (weatherId) => {};

const displayWeatherEmoji = () => {};

const displayError = (message) => {
  const errorDisplay = document.createElement("div");
  errorDisplay.classList.add("errorDisplay");
  errorDisplay.textContent = message;
  info.innerHTML = "";
  info.appendChild(errorDisplay);
  info.style.visibility = "visible";
};

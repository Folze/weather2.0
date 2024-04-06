const getElement = (element) => document.querySelector(element);
const UI_ELEMENTS = {
    temp: getElement('.Temperature'),
    searchForm: getElement('.weather-search-form'),
    inputCity: getElement('.input-city'),
    currentCity: getElement('.weather-city'),
    currentIcon: getElement('.weather-block-cloud'),
    feelsLike: getElement('.feels-like'),
    sunrise: getElement('.sunrise'),
    sunset: getElement('.sunset'),
    heart: getElement('.heart'),
    cityList: getElement('.City-List'),
    currentCity: getElement('.weather-city'),
    favoriteCities: getElement('.favoriteCities'),
}

export { UI_ELEMENTS }


const serverUrlForecast = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid'
const apiKeyForecast ='eed21df466d9691fdef055d585c190c7'
const urlForecast = `${serverUrlForecast}=${apiKeyForecast}`
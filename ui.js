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
    timeTwelve: getElement('.timeTwelve'),
    timeFifteen: getElement('.timeFifteen'),
    timeEighteen: getElement('.timeEighteen'),
    feelsLikeTwelve: getElement('.feels-like-timeTwelve'),
    feelsLikeFifteen: getElement('.feels-like-timeFifteen'),
    feelsLikeEighteen: getElement('.feels-like-timeEighteen'),
}

export { UI_ELEMENTS }
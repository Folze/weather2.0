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
}

export { UI_ELEMENTS }
const getElement = (element) => document.querySelector(element);

const TEMPERATURE= {
    timeTwelve: getElement('.timeTwelve'),
    timeFifteen: getElement('.timeFifteen'),
    timeEighteen: getElement('.timeEighteen'),
    feelsLikeTwelve: getElement('.feels-like-timeTwelve'),
    feelsLikeFifteen: getElement('.feels-like-timeFifteen'),
    feelsLikeEighteen: getElement('.feels-like-timeEighteen'),
}

export {TEMPERATURE}
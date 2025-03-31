import { UI_ELEMENTS } from "./ui.js";
import { TEMPERATURE } from "./temperature.js";

const API_KEY = "eed21df466d9691fdef055d585c190c7";

async function showWeather(cityName) {
  try {
    const serverUrl = "http://api.openweathermap.org/data/2.5/forecast";
    const url = `${serverUrl}?q=${cityName}&appid=${API_KEY}&units=metric`;

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject("Ошибка: Сервер долго отвечает"), 5000)
    );

    const response = await Promise.race([fetch(url), timeout]);

    if (!response.ok) throw new Error("Ошибка запроса");

    const jsonData = await response.json();

    if (jsonData.cod === "404") {
      alert("Город не найден");
      return;
    }

    console.log(jsonData); // check che prihodit

    // City Name
    UI_ELEMENTS.currentCity.textContent = jsonData.city.name;

    // Закат, Восход
    const sunset = new Date(jsonData.city.sunset * 1000);
    const sunrise = new Date(jsonData.city.sunrise * 1000);
    UI_ELEMENTS.sunset.textContent = `${sunset.getHours()}:${sunset
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    UI_ELEMENTS.sunrise.textContent = `${sunrise.getHours()}:${sunrise
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const forecastData = jsonData.list;
    const currentTime = Math.floor(Date.now() / 1000);
    let currentForecast = null;

    for (const forecast of forecastData) {
      if (forecast.dt >= currentTime) {
        currentForecast = forecast;
        break;
      }
    }

    if (currentForecast) {
      // Icon
      const icon = currentForecast.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
      UI_ELEMENTS.currentIcon.setAttribute("src", iconUrl);

      // Temp
      const temperature = Math.round(currentForecast.main.temp);
      const feelsLike = Math.round(currentForecast.main.feels_like);
      UI_ELEMENTS.temp.textContent = `${temperature}°`;
      UI_ELEMENTS.feelsLike.textContent = `${feelsLike}°`;
    }

    // Получение текущей даты
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    // Получение data на 12-15-18 часов
    const timeTwelve = `${year}-${month}-${day} 12:00:00`;
    const timeFifteen = `${year}-${month}-${day} 15:00:00`;
    const timeEighteen = `${year}-${month}-${day} 18:00:00`;

    // 12 часов
    const dataTimeTwelve = forecastData.find(
      (item) => item.dt_txt === timeTwelve
    );
    if (dataTimeTwelve) {
      const tempTimeTwelve = Math.round(dataTimeTwelve.main.temp);
      const feelsLikeTwelve = Math.round(dataTimeTwelve.main.feels_like);
      TEMPERATURE.timeTwelve.textContent = tempTimeTwelve + "°";
      TEMPERATURE.feelsLikeTwelve.textContent = feelsLikeTwelve + "°";
    } else {
      TEMPERATURE.timeTwelve.textContent = "время прошло";
      TEMPERATURE.feelsLikeTwelve.textContent = "время прошло";
    }

    // 15 часов
    const dataTimeFifteen = forecastData.find(
      (item) => item.dt_txt === timeFifteen
    );
    if (dataTimeFifteen) {
      const tempTimeFifteen = Math.round(dataTimeFifteen.main.temp);
      const feelsLikeFifteen = Math.round(dataTimeFifteen.main.feels_like);
      TEMPERATURE.timeFifteen.textContent = `${tempTimeFifteen}°`;
      TEMPERATURE.feelsLikeFifteen.textContent = `${feelsLikeFifteen}°`;
    } else {
      TEMPERATURE.timeFifteen.textContent = "время прошло";
      TEMPERATURE.feelsLikeFifteen.textContent = "время прошло";
    }

    // 18 часов
    const dataTimeEighteen = forecastData.find(
      (item) => item.dt_txt === timeEighteen
    );
    if (dataTimeEighteen) {
      const tempTimeEighteen = Math.round(dataTimeEighteen.main.temp);
      const feelsLikeEighteen = Math.round(dataTimeEighteen.main.feels_like);
      TEMPERATURE.timeEighteen.textContent = `${tempTimeEighteen}°`;
      TEMPERATURE.feelsLikeEighteen.textContent = `${feelsLikeEighteen}°`;
    } else {
      TEMPERATURE.timeEighteen.textContent = "время прошло";
      TEMPERATURE.feelsLikeEighteen.textContent = "время прошло";
    }
  } catch (error) {
    alert("Ошибка при получении погоды");
    console.error(error);
  }
}

UI_ELEMENTS.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityName = UI_ELEMENTS.inputCity.value;
  showWeather(cityName);
});

let cities = JSON.parse(localStorage.getItem("cities")) ?? [];

UI_ELEMENTS.heart.addEventListener("click", (event) => {
  event.preventDefault();
  const city = UI_ELEMENTS.currentCity.textContent;

  const testArr = new Set(cities);
  testArr.add(city);
  const filteredArr = Array.from(testArr);
  if (filteredArr.length >= 13) {
    alert("Слишком много");
  } else {
    localStorage.setItem("cities", JSON.stringify(filteredArr));
    cities = filteredArr;
    renderCities();
  }
});

UI_ELEMENTS.favoriteCities.addEventListener("click", (event) => {
  event.preventDefault();
  renderCities();
});

function renderCities() {
  UI_ELEMENTS.cityList.innerHTML = "";

  cities.forEach((city) => {
    // Создаем элементы
    const newFavCity = document.createElement("div");
    const favCityId = document.createElement("a");
    const cityName = document.createElement("li");
    const btnDeleteFavCity = document.createElement("button");

    // Присваиваем классы
    newFavCity.classList.add("new-favorite-city");
    favCityId.classList.add("favorite-city-id");
    cityName.classList.add("item-li");
    btnDeleteFavCity.classList.add("buttonDelete");

    cityName.textContent = city;

    UI_ELEMENTS.cityList.appendChild(newFavCity);
    newFavCity.appendChild(favCityId);
    newFavCity.appendChild(cityName);
    cityName.appendChild(btnDeleteFavCity);

    // Города
    cityName.addEventListener("click", (event) => {
      event.preventDefault();
      showWeather(city);
      console.log("lol");
    });

    // Удалить из избранного
    btnDeleteFavCity.addEventListener("click", (event) => {
      event.preventDefault();
      deleteCity(city);
      UI_ELEMENTS.cityList.removeChild(newFavCity);
    });
  });
}

function deleteCity(city) {
  const index = cities.indexOf(city);
  if (index > -1) {
    cities.splice(index, 1);
    localStorage.setItem("cities", JSON.stringify(cities));
  }
}

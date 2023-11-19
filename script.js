import { UI_ELEMENTS } from "./ui.js";


async function showWeather(cityName) {
    try {

        // Api
        const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
        let response = await fetch(url);
        let json = await response.json();


        const icon = json.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

        // Восход,Заход
        const sunset = new Date(json.sys.sunset * 1000)
        const sunrise = new Date(json.sys.sunrise * 1000)
        UI_ELEMENTS.sunset.textContent = sunset.getHours() + ":" + sunset.getMinutes()
        UI_ELEMENTS.sunrise.textContent = sunrise.getHours() + ":" + sunrise.getMinutes()

        // Temp
        const temperature = Math.round(json.main.temp);
        const feelsLike = Math.round(json.main.feels_like);
        UI_ELEMENTS.temp.textContent = temperature + '°';
        UI_ELEMENTS.feelsLike.textContent = feelsLike + '°';

        UI_ELEMENTS.currentCity.textContent = json.name;
        UI_ELEMENTS.currentIcon.setAttribute('src', iconUrl);


        // fetch(`${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`)
        //     .then(function (resp) { return resp.json() })
        //     .then(function (data) {
        //         console.log(data)
        //     })

    } catch (err) {
        throw new Error(alert(err));
    }
}




UI_ELEMENTS.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityName = UI_ELEMENTS.inputCity.value;
    showWeather(cityName);
});


UI_ELEMENTS.heart.addEventListener('click', (event) => {
    event.preventDefault();
    const city = UI_ELEMENTS.currentCity.textContent;
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.push(city);

    if (cities.length >= 12) {
        alert("Слишком много")
        renderCities()
    } else {
        localStorage.setItem('cities', JSON.stringify(cities));
        renderCities();
    }
})

function renderCities() {
    UI_ELEMENTS.cityList.innerHTML = '';
    const cities = JSON.parse(localStorage.getItem('cities')) || [];

    cities.forEach((city) => {
        // Создаем
        const newFavCity = document.createElement('li')
        const deleteFavCity = document.createElement('button');
        // Присваиваем класс
        newFavCity.classList.add("item-li");
        deleteFavCity.classList.add("buttonDelete");

        newFavCity.textContent = city;
        UI_ELEMENTS.cityList.appendChild(newFavCity);
        newFavCity.appendChild(deleteFavCity);


        console.log(city)

        newFavCity.addEventListener("click", () => {
            showWeather(city)
        })

        // функция удаления из массива
        function deleteCity(city) {
            const index = cities.indexOf(city);
            if (index > -1) {
                cities.splice(index, 1);
                localStorage.setItem("cities", JSON.stringify(cities));
            }
        }
        // Удалить из избранного
        deleteFavCity.addEventListener("click", function () {
            UI_ELEMENTS.cityList.removeChild(newFavCity);
            const selectedCity = city
            deleteCity(selectedCity);
        });
    });
}


deleteElement(selectedElement);
// deleteFavCity.addEventListener("click", function removeCity() {
//     UI_ELEMENTS.cityList.removeChild(newFavCity);
//     localStorage.setItem("cities", JSON.stringify(cities))
// });
// });
// }
// function deleteCity(city) {
//     const index = cities.indexOf(city);
//     if (index > -1) {
//         cities.splice(index, 1);
//         localStorage.setItem('cities', JSON.stringify(cities));
//     }
// }
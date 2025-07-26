const searchInput = document.querySelector("#searchInput");
const cityName = document.querySelector("#cityName");
const countryName = document.querySelector("#countryName");
const dayName = document.querySelector("#dayName");
const dateText = document.querySelector("#dateText");
const temp = document.querySelector("#temp");
const desc = document.querySelector("#desc");
const highTemp = document.querySelector("#highTemp");
const lowTemp = document.querySelector("#lowTemp");
const sunset = document.querySelector("#sunset");
const sunrise = document.querySelector("#sunrise");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const weatherIcon = document.querySelector("#weatherIcon");
const cityList = document.querySelector("#cityList");
const showCity = document.querySelector(".city");
const apiKey = "24546d6a5873cda66241977fa18444c6";

window.addEventListener("DOMContentLoaded", Events);

let cities = [
  'Buzovna',
  'Xaçmaz',
  'Ələt',
  'Biləsuvar',
  "Bakı",
  "Gəncə",
  "Sumqayıt",
  "Mingəçevir",
  "Naftalan",
  "Şəki",
  "Şirvan",
  "Yevlax",
  "Xankəndi",
  "Lənkəran",
  "Naxçıvan",
  "Ağdam",
  "Ağdaş",
  "Ağcabədi",
  "Ağstafa",
  "Ağsu",
  "Astara",
  "Balakən",
  "Bərdə",
  "Beyləqan",
  "Biləsuvar",
  "Daşkəsən",
  "Füzuli",
  "Goranboy",
  "Göyçay",
  "Göygöl",
  "Hacıqabul",
  "İmişli",
  "İsmayıllı",
  "Cəbrayıl",
  "Culfa",
  "Kəlbəcər",
  "Kəngərli",
  "Kürdəmir",
  "Lerik",
  "Masallı",
  "Neftçala",
  "Oğuz",
  "Ordubad",
  "Qəbələ",
  "Qax",
  "Qazax",
  "Qobustan",
  "Qubadlı",
  "Qusar",
  "Saatlı",
  "Sabirabad",
  "Şabran",
  "Şahbuz",
  "Şərur",
  "Salyan",
  "Şamaxı",
  "Şəmkir",
  "Samux",
  "Siyəzən",
  "Tərtər",
  "Tovuz",
  "Ucar",
  "Yardımlı",
  "Zaqatala",
  "Zəngilan",
  "Zərdab",
];

let city = "baku";

function Events() {
  time();
  getWeather(city); 
  
  searchInput.addEventListener("input", selectCity);

  searchInput.addEventListener("focus", () => {
    cityList.classList.add("active");
  });

  searchInput.addEventListener("blur", () => {
    setTimeout(() => {
      cityList.classList.remove("active");
    }, 200);
  });
  

  cityList.addEventListener("click", () => {
    city = cityList.textContent;
    searchInput.value = city;
    getWeather(city);
    cityList.classList.remove("active");
  });
}

function selectCity() {
  const filteredCities = cities.filter((region) =>
    region.toLowerCase().startsWith(searchInput.value.toLowerCase())
  );
  
  cityList.textContent = filteredCities[0] || '';
}

function getWeather(selectedCity) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      weather(data);
    })
    .catch((error) => {
      console.error('Weather data alınarkən xəta:', error);
    });
}

function sunTime(sunriseT, sunsetT) {
  const sunriseTime =
    sunriseT.getHours().toString().padStart(2, "0") +
    ":" +
    sunriseT.getMinutes().toString().padStart(2, "0");
  const sunsetTime =
    sunsetT.getHours().toString().padStart(2, "0") +
    ":" +
    sunsetT.getMinutes().toString().padStart(2, "0");
  sunrise.textContent = sunriseTime;
  sunset.textContent = sunsetTime;
}

function weather(data) {
  temp.textContent = Math.round(data.main.temp) + "°C";
  highTemp.textContent = Math.round(data.main.temp_max + 1) + "°C";
  lowTemp.textContent = Math.round(data.main.temp_min - 1) + "°C";
  wind.textContent = Math.round(data.wind.speed) + " " + "kmh";
  humidity.textContent = data.main.humidity + "%";
  countryName.textContent = data.sys.country;
  cityName.textContent = data.name + ",";
  data.weather.forEach((i) => {
    capitalizeFirstLetter(i.description);
  });

  const sunriseDate = new Date(data.sys.sunrise * 1000);
  const sunsetDate = new Date(data.sys.sunset * 1000);
  sunTime(sunriseDate, sunsetDate);
}

function capitalizeFirstLetter(word) {
  const text = word.charAt(0).toUpperCase() + word.slice(1);
  desc.textContent = text;
}

const months = [
  "January",
  "February",
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

const weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function time() {
  const now = new Date();
  const day = now.getDate().toString();
  const month = now.getMonth();
  const week = now.getDay();

  dateText.textContent = months[month] + " " + day;
  dayName.textContent = weeks[week] + ",";
}

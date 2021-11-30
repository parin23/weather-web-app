// Selectors
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const desElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

// APP DATA

const weather = {};
weather.temperature = {
    unit:"celsius"
}

// Variables
const KELVIN = 273;
const KEY = '82005d27a116c2880c8f0fcb866998a0'

// Check if Browser Supports Location

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p>No Location Access</p>`;
}

// SEt the Location

function setPosition (position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}

// ShOw error

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

// GET Weather from API

function getWeather(latitude,longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        // console.log(data);
        weather.temperature.value = data.main.temp;
        weather.description = data.weather[0].description;
        weather.iconID= data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        console.log(data.weather.icon);
    })
    .then(function(){
        displayWeather();
    })
}

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconID}.png"/>`;
    tempElement.innerHTML = `${Math.floor(weather.temperature.value - KELVIN)}° <span>C</span>`;
    desElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

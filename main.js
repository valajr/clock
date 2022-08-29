const API = {
    'consult': "https://api.openweathermap.org/data/2.5/onecall?",
    'lat': "lat=",
    'lon': "&lon=",
    'appid': "&appid=3045dd712ffe6e702e3245525ac7fa38",
};

let timer = document.querySelector('.timer');
let pos = document.querySelector('.pos');
let temp = document.querySelector('.temp');
let feels_like = document.querySelector('.feels');
let wind_speed = document.querySelector('.wspeed');
let weather = document.querySelector('.weather');

function countDozens(number) {
    if(number < 10) {
        return '0' + number;
    }

    return number;
}

async function startTimer() {
    setInterval(() => {
        let data = new Date();
        let hours = countDozens(data.getHours());
        let minutes = countDozens(data.getMinutes());
        let seconds = countDozens(data.getSeconds());
        timer.innerHTML = hours + ':' + minutes + ':' + seconds;
    }, 1000);
}

async function fetchWeather(weather) {
    const APIResponse = await fetch(API.consult + weather);
    const data = await APIResponse.json();
    return data;
}

function climate(data) {
    temp.innerHTML = '<br>' + data.current.temp;
    feels_like.innerHTML = '<br>' + data.current.feels_like;
    wind_speed.innerHTML = '<br>' + data.current.wind_speed;
    weather.innerHTML = '<br>' + data.current.weather[0].main;
}

async function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    pos.innerHTML = "<br>Latitude: " + lat + 
    "<br>Longitude: " + lon;
    let data = await fetchWeather(API.lat + lat + API.lon + lon + API.appid);
    climate(data);
} 

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}





startTimer();
getLocation();
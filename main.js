const API = {
    'consult': "https://api.openweathermap.org/data/2.5/onecall?",
    'lat': "lat=",
    'lon': "&lon=",
    'appid': "&appid=3045dd712ffe6e702e3245525ac7fa38"
};

const MONTH = {
    '0': "jan",
    '1': "feb",
    '2': "mar",
    '3': "apr",
    '4': "may",
    '5': "jun",
    '6': "jul",
    '7': "aug",
    '8': "set",
    '9': "oct",
    '10': "nov",
    '11': "dez"
};

let timer = document.querySelector('.timer');
let background = document.querySelector('.background');
let calendar = document.querySelector('.calendar');
let day_time;

let temp = document.querySelector('.temp');
let feels_like = document.querySelector('.feels');
let weather = document.querySelector('.weather');
let dog = document.querySelector('.dog');
let dog_house = document.querySelectorAll('.dog-house');
dog_house[1].style.display = 'none';
let wind_speed;

function countDozens(number) {
    if(number < 10) {
        return '0' + number;
    }

    return number;
}

function startTimer() {
    setInterval(() => {
        let data = new Date();
        let hours = countDozens(data.getHours());
        let minutes = countDozens(data.getMinutes());
        let seconds = countDozens(data.getSeconds());

        if(day_time != hours) {
            day_time = hours;
            let time = 'day';
            if(day_time > 12) {
                time = 'night';
            }
            background.src = './static/img/' + time + '.png';
        }
        timer.innerHTML = hours + ':' + minutes + ':' + seconds;

        let day = data.getDate();
        let month = data.getMonth();
        month = MONTH[month];
        calendar.innerHTML = day + '<br>' + month;
    }, 1000);
}

async function fetchWeather(weather) {
    const APIResponse = await fetch(API.consult + weather);
    const data = await APIResponse.json();
    return data;
}

function kelvinToCelsius(temp) {
    celsius = temp - 273.15;
    return celsius.toFixed(2);
}

async function loadData(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let data = await fetchWeather(API.lat + lat + API.lon + lon + API.appid);

    temp.innerHTML = '<br>' + kelvinToCelsius(data.current.temp) + 'ºC';
    feels_like.innerHTML = '<br>' + kelvinToCelsius(data.current.feels_like) + 'ºC';

    weather.src = './static/img/' + data.current.weather[0].icon + '.png';

    if(data.current.weather[0].main == 'rain') {
        dog.src = './static/img/dog_sad.png';
        dog.classList.add('raining');
    } 
    if(day_time < 12) {
        dog.src = './static/img/dog_sleeping.png';
        dog.classList.add('sleeping');
        dog_house[1].src = './static/img/dog_house_up.png';
        dog_house[1].style.display = 'inline-block';
    }
    wind_speed = data.current.wind_speed;
} 

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(loadData);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

startTimer();
getLocation();
//state 
//Ao rodar o código, já retorna as informações da cidade de São Paulo, para alterar a cidade,...
//... basta digitar na barra de pesquisa a cidade

let currCity = "São Paulo";
let units = "metric";

//Selectors
//Declaração das variáveis
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector(".weather__forecast");
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax");
let weather__realfeel = document.querySelector(".weather__realfeel");
let weather__humidity = document.querySelector(".weather__humidity");
let weather__wind = document.querySelector(".weather__wind");
let weather__pressure = document.querySelector(".weather__pressure");

//Search: Enter na barra de pesquisa para realizar o submit
document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    //prevent default action
    e.preventDefault();
    //change current city
    currCity = search.value;
    //get weather forecast
    getWeather();
    // clear form
    search.value = ""
});

//Search: clique no ícone de pesquisa para realizar o submit
document.querySelector(".weather__search").addEventListener('click', e => {
    let search = document.querySelector(".weather__searchform");
    // Prevent default action
    e.preventDefault();
    // Change current city
    currCity = search.value;
    // Get weather forecast
    getWeather();
    // Clear form
    search.value = "";
});

//Evento para trocar grau Celsius para Fahrenheit
//units
document.querySelector(".weather_unit_celsius").addEventListener('click', () => { 
    if(units !== "metric"){
        //change to metric
        units = "metric"
        //get weather forecast
        getWeather()
    };
});

document.querySelector(".weather_unit_farenhe").addEventListener('click', () => {
    if(units !== "imperial"){
        //change to imperial
        units = "imperial"
        //get weather forecast
        getWeather()
    };
});


//Função para retornar as informações adicionais do weather__info, como dia, mês e ano
// a data e hora ficou de fora, pois não consegui ajustar para o fuso-horário local

function convertTimeStamp(timestamp, timezone){
    const convertTimezone = timezone / 3600; //converte segundos para horas

    const date = new Date(timestamp *1000);

    const options = {
        weekday:"long",
        day: "numeric",
        month: "long",
        year: "numeric",
        //hour:"numeric",
        //minute: "numeric",
        //timeZone:`Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`, hour12:false,
    };
    return date.toLocaleString("pt-BR", options); 
}; 


//convert contry code to name PARA obter o nome do país da cidade pesquisada
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["pt-BR"], {type:"region"});
    return regionNames.of(country);
}

// Função para consumir os recursos da API do OpenWeatherMap
function getWeather(){
    const API_KEY = 'bbe3496f95f23d4291793a0b87890d01';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}&lang=pt`).then(res => res.json()).then(data => {console.log(data) 
        city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}` 
        datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
        weather__forecast.innerHTML = `<p>${data.weather[0].description}`
        weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176` 
        weather__icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`
        weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
        weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
        weather__humidity.innerHTML = `${data.main.humidity}%`
        weather__wind.innerHTML = `${data.wind.speed}${units==="imperial"?"mph":"m/s"}`
        weather__pressure.innerHTML = `${data.main.pressure} hPa`

    });
};

document.body.addEventListener('load',
getWeather())
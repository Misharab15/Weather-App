// function which checks if the city name is blank or if there is a digit in a city name before the further execution of code

function checkInputData() {
    const cityName = document.getElementById("city").value;
    if(!cityName) {                             // check if city name is emtpty
        alert('Please enter a city name');
        return;
    } else{
        let arr = [];                           // store city name in an array & check if there is a digit in it
        arr.push(cityName);
        const checkDigit = /\d/.test(arr)
            if(checkDigit){
            alert("Please enter a valid city name. Numbers are not allowed!!!");
            } else {
            getWeatherReport();       
        }
    }
}


// async function to fetch the weather report from API & wait for the response

async function getWeatherReport(){
    const ApiKey = "e9372dc8fd771c603f94e656aa30aa9c";       // Enter your API Key.Get it from API
    const city = document.getElementById("city").value;

    const WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}`;

    let weatherResponse = await fetch(WeatherUrl);          // fetching weather report
    let forecastResponse = await fetch(forecastUrl);        // fetching forecast report
    let weatherData = await weatherResponse.json();         // converting weather report to json format
    let forecastData = await forecastResponse.json();       // converting forecast report to json format
    
    displayWeatherData(weatherData);
    hourlyWeatherReport(forecastData);  

    document.querySelector("input").value = "";
}


// function to sidplay weather image, temperature and weather description

function displayWeatherData (weatherData) {
    const temperatureInfoHTMLDiv = document.querySelector(".temperatureInfo");
    const weatherInfoHTMLDiv = document.querySelector(".weatherInfo")
    const weatherIMGTag = document.getElementById("weatherImage");

        if(weatherData.cod === "404") {
            alert(weatherData.message);
        } else {
            let temperature = Math.round(weatherData.main.temp - 273.15);
            const cityName = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            let getWeatherIcon = weatherData.weather[0].icon;
            let displayWeatherIcon = `https://openweathermap.org/img/wn/${getWeatherIcon}@2x.png`
    
            // creating HTML elements in JS
            const temperatureHTML = `<p>${temperature}°C</p>`
            const weatherHTML = `
            <p>${cityName}</p>
            <p>${weatherDescription}</p>`
    
            // displaying weather report
            temperatureInfoHTMLDiv.innerHTML = temperatureHTML;
            weatherInfoHTMLDiv.innerHTML = weatherHTML;
            weatherIMGTag.src = displayWeatherIcon;
            weatherIMGTag.alt = weatherDescription;
    
            showWeatherImage(); 
        }
}


// function for displaying hourly weather forecast

function hourlyWeatherReport (forecastData) {
    let HourlyData = document.querySelector(".hourlyWeatherForecast")
    let twentyFourHourForecast = forecastData.list.slice(0, 8);

    // ForEach method to apply same funtion on all elements of an array
    twentyFourHourForecast.forEach(item => {   
    let milliSecondsTime = new Date(item.dt * 1000);
    let hourlyReport = milliSecondsTime.getHours();
    const temperature = Math.round(item.main.temp -273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`
    
    // creating HTML elements in JS
    const hourlyWeatherForecastHTML = `
        <div class = "Per3HourForecastDiv">
            <span>${hourlyReport}:00</span>
            <img src="${iconUrl}" alt="Weather Image">
            <span>${temperature}°C</span>
        </div>`

    // This below statement can be written as:  "HourlyData.innerText += hourlyWeatherForecast"
    HourlyData.insertAdjacentHTML('beforeend', hourlyWeatherForecastHTML);

    });

}


// function to display the weather image

function showWeatherImage () {
    const img = document.getElementById("weatherImage");
    img.style.display = "block";

    const temperatureInfo = document.querySelector(".temperatureInfo");
    temperatureInfo.style.marginTop = "-40px"
}
//----------------API Info------------------//
const apiKey = "fa9c3ae867be4f02bbb32747240612";
const defaultCity = "New Delhi";

//--------Weather Elements-------//
let searchBox = document.getElementById("searchbox");
let weatherImg = document.getElementById("weatherimg");
let weatherCon = document.getElementById("weathercon");
let tempratureNum = document.getElementById("tnum");
let windSpeed = document.getElementById("windnum");
let humidityPer = document.getElementById("humiditynum");
let aqiNum = document.getElementById("aqinum");


//-------------------adding Enter button input ability------------------//
searchBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchiconparent").click();
    }
});



//------------------------------------AQI calculation logic---------------------------------------------//
function calculateAQI(concentration) {
    let aqi;
    const breakpoints = [
        { low: 0.0, high: 12.0, aqiLow: 0, aqiHigh: 50 },
        { low: 12.1, high: 35.4, aqiLow: 51, aqiHigh: 100 },
        { low: 35.5, high: 55.4, aqiLow: 101, aqiHigh: 150 },
        { low: 55.5, high: 150.4, aqiLow: 151, aqiHigh: 200 },
        { low: 150.5, high: 250.4, aqiLow: 201, aqiHigh: 300 },
        { low: 250.5, high: 350.4, aqiLow: 301, aqiHigh: 400 },
        { low: 350.5, high: 500.4, aqiLow: 401, aqiHigh: 500 },
    ];

    for (let bp of breakpoints) {
        if (concentration >= bp.low && concentration <= bp.high) {
            aqi = ((bp.aqiHigh - bp.aqiLow) / (bp.high - bp.low)) * (concentration - bp.low) + bp.aqiLow;
            return Math.round(aqi);
        }
    }

    return "Out of range";
}

//-----------------------------------fetch and display weather data ---------------------------------//
async function fetchWeather() {
    let city = searchBox.value || defaultCity; // Default to "New Delhi" if searchBox is empty
    
    //------------------Dynamically construct the API URL-------------//
    let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        //------get weather and store as a json------//
        const response = await fetch(apiUrl);
        const data = await response.json();

        //-----------update the weather elements on the page-----------//
        searchBox.value = `${data.location.name}, ${data.location.country}`;
        weatherImg.setAttribute('src', data.current.condition.icon.replaceAll("64", "128"));
        weatherCon.innerText = data.current.condition.text;
        tempratureNum.innerText = Math.round(data.current.temp_c);
        windSpeed.innerText = data.current.wind_kph + " Km/h";
        humidityPer.innerText = data.current.humidity + " %";

        //----AQI updation----//
        let pm25 = data.current.air_quality.pm2_5;
        let aqi = calculateAQI(pm25);
        aqiNum.innerText = "AQI: " + aqi;

    } catch (error) {
        weatherCon.innerText = "Error!";
    }
}

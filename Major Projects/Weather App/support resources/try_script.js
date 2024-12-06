// API Endpoint and Parameters
const apiKey = "fa9c3ae867be4f02bbb32747240612";
const city = "New Delhi";
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

// Async function to fetch weather data
async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`City: ${data.location.name}, ${data.location.country}`);
        console.log(`Temperature: ${data.current.temp_c}°C`);
        console.log(`Condition: ${data.current.condition.text}`);
        console.log(`Humidity: ${data.current.humidity}%`);
        console.log(`Wind Speed: ${data.current.wind_kph} kph`);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Call the function
fetchWeather();

// Function to calculate AQI based on EPA formula
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

  return "Out of range"; // If concentration exceeds 500.4
}



// Async function to fetch and log AQI
async function fetchAndLogAQI() {
  const url = "https://api.weatherapi.com/v1/current.json?key=fa9c3ae867be4f02bbb32747240612&q=New%20Delhi&aqi=yes";

  try {
    const response = await fetch(url);
    const data = await response.json();
    const pm25 = data.current.air_quality.pm2_5; // Extract PM2.5 concentration
    const aqi = calculateAQI(pm25); // Calculate AQI

    console.log(`PM2.5 concentration: ${pm25} µg/m³`);
    console.log(`Calculated AQI (PM2.5): ${aqi}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the async function
fetchAndLogAQI();

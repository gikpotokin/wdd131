const yearSpan = document.getElementById("year");
const modifiedSpan = document.getElementById("lastModified");
const windChillSpan = document.getElementById("windchill");

yearSpan.textContent = new Date().getFullYear();
modifiedSpan.textContent = document.lastModified;

// Static weather values
const temperature = 10; // °C
const windSpeed = 5;    // km/h

function calculateWindChill(temp, wind) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(wind, 0.16) +
    0.3965 * temp * Math.pow(wind, 0.16)
  ).toFixed(1);
}

if (temperature <= 10 && windSpeed > 4.8) {
  windChillSpan.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
  windChillSpan.textContent = "N/A";
}

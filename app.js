window.addEventListener('load', () =>{
    let long, lat;
    let currentTemperatureFahrenheit = null;
    let currentUnit = 'F';

    function fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * (5 / 9);
    }

    function getFontAwesomeIcon(apiIcon) {
        const iconMap = {
            'clear-day': 'fa-sun',
            'clear-night': 'fa-moon',
            'rain': 'fa-cloud-showers-heavy',
            'snow': 'fa-snowflake',
            'sleet': 'fa-cloud-meatball',
            'wind': 'fa-wind',
            'fog': 'fa-smog',
            'cloudy': 'fa-cloud',
            'partly-cloudy-day': 'fa-cloud-sun',
            'partly-cloudy-night': 'fa-cloud-moon',
            'hail': 'fa-cloud-hail', // Assuming Font Awesome has this or a similar one
            'thunderstorm': 'fa-bolt',
            'tornado': 'fa-tornado', // Assuming Font Awesome has this or a similar one
        };
        return iconMap[apiIcon] || 'fa-question-circle'; // Default icon
    }

    function getWeatherBackground(apiIcon) {
        const backgrounds = {
            'clear-day': 'linear-gradient(to top, #2980B9, #6DD5FA, #FFFFFF)', // Sunny sky
            'clear-night': 'linear-gradient(to top, #0F2027, #203A43, #2C5364)', // Clear night sky
            'rain': 'linear-gradient(to top, #6c7a89, #434343)', // Rainy, dark clouds
            'snow': 'linear-gradient(to top, #ECE9E6, #FFFFFF)', // Snowy white
            'sleet': 'linear-gradient(to top, #757F9A, #D7DDE8)', // Sleet, cold grey
            'wind': 'linear-gradient(to top, #BDBBBE, #8A888B)', // Windy grey
            'fog': 'linear-gradient(to top, #757F9A, #D7DDE8)', // Foggy grey
            'cloudy': 'linear-gradient(to top, #606c88, #3f4c6b)', // Cloudy sky
            'partly-cloudy-day': 'linear-gradient(to top, #76b852, #8DC26F, #dce35b)', // Partly cloudy, some sun
            'partly-cloudy-night': 'linear-gradient(to top, #141E30, #243B55)', // Partly cloudy night
            'hail': 'linear-gradient(to top, #3E5151, #DECBA4)',
            'thunderstorm': 'linear-gradient(to top, #1F1C2C, #928DAB)',
            'tornado': 'linear-gradient(to top, #2c3e50, #000000)',
        };
        return backgrounds[apiIcon];
    }

    const weatherIconElement = document.getElementById('weather-icon'); // Define once
    const degreeSection = document.querySelector(".degree-section"); // Select once
    const temperatureDegreeText = document.querySelector(".temperature-degree"); // Select once
    const temperatureUnitText = document.getElementById("temperature-unit"); // Select once
    const descriptionText = document.querySelector(".description"); // Select once
    const locationTimezoneText = document.getElementById("location-timezone"); // Select once

    if ( navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (position) =>{
            lat = position.coords.latitude;
            long = position.coords.longitude;
            // let temperatureDegreeText = document.querySelector(".temperature-degree"); - Already selected
            // let descriptionText = document.querySelector(".description"); - Already selected
            // Construct the URL for our new weather_api.php endpoint
            const apiUrl = `weather_api.php?lat=${lat}&long=${long}`;
            fetch(apiUrl)
            .then(response => response.json())
            .then((data) => {
                console.log( data );
                // Handle API errors from weather_api.php
                if (data.error) {
                    descriptionText.textContent = data.error;
                    if (temperatureDegreeText) temperatureDegreeText.textContent = "-";
                    if (temperatureUnitText) temperatureUnitText.textContent = "";
                    if (weatherIconElement) {
                        weatherIconElement.className = 'fas fa-exclamation-triangle';
                    }
                    return;
                }
                const { temperature, summary, icon } = data.currently; // Destructure icon
                currentTemperatureFahrenheit = temperature; // Store Fahrenheit temp
                temperatureDegreeText.textContent = Math.round(currentTemperatureFahrenheit); // Display rounded F
                temperatureUnitText.textContent = "F";
                currentUnit = 'F'; // Set current unit state

                descriptionText.textContent = summary;
                locationTimezoneText.textContent = data.timezone;

                // Set weather icon using Font Awesome classes
                if (weatherIconElement) {
                    weatherIconElement.className = ''; // Clear existing classes
                    weatherIconElement.classList.add('fas', getFontAwesomeIcon(icon));
                }

                // Set dynamic background
                const backgroundStyle = getWeatherBackground(icon);
                if (backgroundStyle) {
                    document.body.style.background = backgroundStyle;
                }
            })
            .catch( error => {
                descriptionText.textContent = "Failed to load weather data. Please try again later.";
                if (temperatureDegreeText) temperatureDegreeText.textContent = "-";
                if (temperatureUnitText) temperatureUnitText.textContent = "";
                if (weatherIconElement) {
                    weatherIconElement.className = 'fas fa-exclamation-triangle';
                }
                console.error("API Error:", error); // Keep logging the error to the console for debugging
            });
        }, error => { // Handle getCurrentPosition error
            // temperatureDegreeText and descriptionText already selected
            descriptionText.textContent = "Unable to retrieve your location. Please ensure location services are enabled and permission is granted. Error: " + error.message;
            temperatureDegreeText.textContent = "-";
            if (temperatureUnitText) temperatureUnitText.textContent = "";
            locationTimezoneText.textContent = "N/A";
            if (weatherIconElement) {
                weatherIconElement.className = 'fas fa-map-marker-alt-slash'; // More specific error icon
            }
        });
    } else { // Handle geolocation not available
        // temperatureDegreeText and descriptionText already selected
        descriptionText.textContent = "Geolocation is not supported by your browser. Please enable it or use a different browser to see the weather.";
        temperatureDegreeText.textContent = "-";
        if (temperatureUnitText) temperatureUnitText.textContent = "";
        locationTimezoneText.textContent = "N/A";
        if (weatherIconElement) {
            weatherIconElement.className = 'fas fa-question-circle'; // Or another suitable icon
        }
    }

    // Add click listener for temperature toggling
    if(degreeSection) { // Ensure degreeSection is found
        degreeSection.addEventListener('click', () => {
            if (currentTemperatureFahrenheit === null) return; // Don't toggle if no temp loaded

            if (currentUnit === 'F') {
                let celsius = fahrenheitToCelsius(currentTemperatureFahrenheit);
                temperatureDegreeText.textContent = Math.round(celsius * 10) / 10; // Round to 1 decimal
                temperatureUnitText.textContent = 'C';
                currentUnit = 'C';
            } else {
                temperatureDegreeText.textContent = Math.round(currentTemperatureFahrenheit);
                temperatureUnitText.textContent = 'F';
                currentUnit = 'F';
            }
        });
    }
}})
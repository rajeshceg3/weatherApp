window.addEventListener('load', () =>{
    let long, lat;
    let currentTemperatureFahrenheit = null;
    let currentUnit = 'F';

    function fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * (5 / 9);
    }

    function getFontAwesomeIcon(apiIcon) {
        const iconMap = {
            '01d': 'fa-sun', // clear sky day
            '01n': 'fa-moon', // clear sky night
            '02d': 'fa-cloud-sun', // few clouds day
            '02n': 'fa-cloud-moon', // few clouds night
            '03d': 'fa-cloud', // scattered clouds day
            '03n': 'fa-cloud', // scattered clouds night
            '04d': 'fa-cloud-meatball', // broken clouds day (using 'cloud-meatball' as a distinct cloudy icon)
            '04n': 'fa-cloud-meatball', // broken clouds night
            '09d': 'fa-cloud-showers-heavy', // shower rain day
            '09n': 'fa-cloud-showers-heavy', // shower rain night
            '10d': 'fa-cloud-sun-rain', // rain day
            '10n': 'fa-cloud-moon-rain', // rain night
            '11d': 'fa-bolt', // thunderstorm day
            '11n': 'fa-bolt', // thunderstorm night
            '13d': 'fa-snowflake', // snow day
            '13n': 'fa-snowflake', // snow night
            '50d': 'fa-smog', // mist day
            '50n': 'fa-smog'  // mist night
        };
        return iconMap[apiIcon] || 'fa-question-circle'; // Default icon
    }

    function getWeatherBackground(apiIcon) {
        const backgrounds = {
            '01d': 'linear-gradient(to top, #2980B9, #6DD5FA, #FFFFFF)', // clear sky day (Sunny sky)
            '01n': 'linear-gradient(to top, #0F2027, #203A43, #2C5364)', // clear sky night (Clear night sky)
            '02d': 'linear-gradient(to top, #76b852, #8DC26F, #dce35b)', // few clouds day (Partly cloudy, some sun)
            '02n': 'linear-gradient(to top, #141E30, #243B55)', // few clouds night (Partly cloudy night)
            '03d': 'linear-gradient(to top, #606c88, #3f4c6b)', // scattered clouds day (Cloudy sky)
            '03n': 'linear-gradient(to top, #141E30, #243B55)', // scattered clouds night (using partly cloudy night for variation)
            '04d': 'linear-gradient(to top, #485563, #29323c)', // broken clouds day (more intense cloudy)
            '04n': 'linear-gradient(to top, #232526, #414345)', // broken clouds night (darker intense cloudy)
            '09d': 'linear-gradient(to top, #6c7a89, #434343)', // shower rain day (Rainy, dark clouds)
            '09n': 'linear-gradient(to top, #3c3c3c, #1a1a1a)', // shower rain night (Darker rainy)
            '10d': 'linear-gradient(to top, #bdc3c7, #2c3e50)', // rain day (Softer rain)
            '10n': 'linear-gradient(to top, #2c3e50, #000000)', // rain night (Darker softer rain)
            '11d': 'linear-gradient(to top, #1F1C2C, #928DAB)', // thunderstorm day/night
            '11n': 'linear-gradient(to top, #1F1C2C, #928DAB)',
            '13d': 'linear-gradient(to top, #ECE9E6, #FFFFFF)', // snow day/night (Snowy white)
            '13n': 'linear-gradient(to top, #ECE9E6, #FFFFFF)',
            '50d': 'linear-gradient(to top, #757F9A, #D7DDE8)', // mist day/night (Foggy grey)
            '50n': 'linear-gradient(to top, #757F9A, #D7DDE8)'
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
window.addEventListener('load', () =>{
    let long, lat;
    if ( navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (position) =>{
            lat = position.coords.latitude;
            long = position.coords.longitude;
            let temperatureDegreeText = document.querySelector(".temperature-degree");
            let descriptionText = document.querySelector(".description");
            // Construct the URL for our new weather_api.php endpoint
            const apiUrl = `weather_api.php?lat=${lat}&long=${long}`;
            fetch(apiUrl)
            .then(response => response.json())
            .then((data) => {
                console.log( data );
                // Handle API errors from weather_api.php
                if (data.error) {
                    descriptionText.textContent = data.error;
                    return;
                }
                const { temperature, summary } = data.currently;
                temperatureDegreeText.textContent = temperature;
                document.querySelector(".degree-section span").textContent = "F";
                descriptionText.textContent = summary;
                document.getElementById("location-timezone").textContent = data.timezone;
                document.getElementById("weather-icon").textContent = data.currently.icon;
            })
            .catch( error => {
                descriptionText.textContent = "Failed to load weather data. Please try again later.";
                console.error("API Error:", error); // Keep logging the error to the console for debugging
            });
        }, error => { // Handle getCurrentPosition error
            let temperatureDegreeText = document.querySelector(".temperature-degree");
            let descriptionText = document.querySelector(".description");
            descriptionText.textContent = "Unable to retrieve your location. Please ensure location services are enabled and permission is granted. Error: " + error.message;
            temperatureDegreeText.textContent = "-";
            document.getElementById("location-timezone").textContent = "N/A";
            document.getElementById("weather-icon").textContent = "";
        });
    } else { // Handle geolocation not available
        let temperatureDegreeText = document.querySelector(".temperature-degree");
        let descriptionText = document.querySelector(".description");
        descriptionText.textContent = "Geolocation is not supported by your browser. Please enable it or use a different browser to see the weather.";
        temperatureDegreeText.textContent = "-";
        document.getElementById("location-timezone").textContent = "N/A";
        document.getElementById("weather-icon").textContent = "";
    }
}})
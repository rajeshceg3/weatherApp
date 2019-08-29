window.addEventListener('load', () =>{
    let long, lat;
    if ( navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (position) =>{
            lat = position.coords.latitude;
            long = position.coords.longitude;
            let temperatureDegreeText = document.querySelector(".temperature-degree");
            let descriptionText = document.querySelector(".description");
            let locationText = document.querySelector(".location");
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/83223a78a86f77f0073c5a481897669a/${lat},${long}`;
            fetch(api)
            .then(response => response.json())
            .then((data) => {
                console.log( data );
                const { temperature, summary } = data.currently;
                temperatureDegreeText.textContent = temperature;
                descriptionText.textContent = summary;
                locationText.textContent = data.timezone;
            })
            .catch( error => alert(error));
});
}})
// Selectors
const searchContainerElem = document.querySelector('.search-container');
const searchBtnElem = document.querySelector('.search-btn');
const cancelBtnElem = document.querySelector('.cancel-btn');
const searchInputElem = document.querySelector('.search-input');

const cityElem = document.getElementById('weatherCity-container');
const iconElem = document.getElementById('weatherIcon');
const temperatureElem = document.getElementById('temperature');
const weatherDescriptionElem = document.getElementById('weather-description');
const humidityElem = document.getElementById('humidity');
const pressureElem = document.getElementById('pressure');
const windSpeedElem = document.getElementById('wind-speed');
const precipitationElem = document.getElementById('precipitation');







// Global Variables


// Functions

// const initMap = () => {
//     
// }





function initMap() {
    
    const searchBox = new google.maps.places.SearchBox(searchInputElem)
    searchBox.addListener('places_changed', () => {
          const place = searchBox.getPlaces()[0]
          if(place == null) return 
          const lat = place.geometry.location.lat()
          const long = place.geometry.location.lng()
          
          fetch('/html/apps/07_weather-app/public/weather', {
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",  
            },
            method: 'POST',
            body: JSON.stringify({
                lat: lat,
                long: long
            })
          }).then(res => res.json()).then(data => {
            setWeatherData(data, place.formatted_address)
          })
      })
}

const setWeatherData = (data, place) => {
    
        let weather = data
        cityElem.textContent = place;
        temperatureElem.textContent = `${+weather.temperature.toFixed(1)} °C`;
        const w = weather.weatherCode
        iconElem.src = `./../imgs/${+w >= 1100 && +w < 4000 ? "clouds.png" : +w >= 4000 && +w < 5100 ? "rain.png" : +w >= 5100 && +w < 5900 ? "snow.png" : +w >= 6000 && +w < 9000 ? "drizzle.png" : "clear.png"}`
        
        // Weather types
        const typeOfWeather = {
            "0": "Unknown",
            "1000": "Clear, Sunny",
            "1100": "Mostly Clear",
            "1101": "Partly Cloudy",
            "1102": "Mostly Cloudy",
            "1001": "Cloudy",
            "2000": "Fog",
            "2100": "Light Fog",
            "4000": "Drizzle",
            "4001": "Rain",
            "4200": "Light Rain",
            "4201": "Heavy Rain",
            "5000": "Snow",
            "5001": "Flurries",
            "5100": "Light Snow",
            "5101": "Heavy Snow",
            "6000": "Freezing Drizzle",
            "6001": "Freezing Rain",
            "6200": "Light Freezing Rain",
            "6201": "Heavy Freezing Rain",
            "7000": "Ice Pellets",
            "7101": "Heavy Ice Pellets",
            "7102": "Light Ice Pellets",
            "8000": "Thunderstorm"
        }[w] || "Unknown"

        weatherDescriptionElem.textContent = `${typeOfWeather}`;

        humidityElem.textContent = `${weather.humidity} %`;
        pressureElem.textContent = `${+(weather.pressureSurfaceLevel * Math.pow(10, -3)).toFixed(2)} bar`;
        windSpeedElem.textContent = `${weather.windSpeed} m/s`;
        precipitationElem.textContent = `${weather.precipitationProbability} %`;
}


// Events

searchBtnElem.addEventListener('click', () => {
    searchContainerElem.classList.add('activeSearch');
    searchInputElem.classList.add('activeSearch');
    searchBtnElem.classList.add('activeSearch');
    cancelBtnElem.classList.add('activeSearch');
})

cancelBtnElem.addEventListener('click', () => {
    searchContainerElem.classList.remove('activeSearch');
    searchInputElem.classList.remove('activeSearch');
    searchBtnElem.classList.remove('activeSearch');
    cancelBtnElem.classList.remove('activeSearch');
})





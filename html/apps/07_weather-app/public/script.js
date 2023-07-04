// Selectors
const searchContainerElem = document.querySelector('.search-container');
const searchBtnElem = document.querySelector('.search-btn');
const cancelBtnElem = document.querySelector('.cancel-btn');
const searchInputElem = document.querySelector('.search-input');

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
          
          fetch('/weather', {
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
            console.log(data)
            setWeatherData(data, place.formatted_address)
          })
      })
}



const setWeatherData = (data, place) => {
    
        let weather = data
        temperatureElem.textContent = `${weather.temperature} &degC`
        weatherDescriptionElem.textContent = `${weather.weatherCode}`
        humidityElem.textContent = `${weather.humidity} %`
        pressureElem.textContent = `${weather.pressureSurfaceLevel * Math.pow(10, -3)} bar`
        windSpeedElem.textContent = `${weather.windSpeed} m/s`
        precipitationElem.textContent = `${weather.precipitationProbability} %`
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





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
const searchBox = new google.maps.places.SearchBox(searchInputElem)
    searchBox.addListener('places_changed', () => {
        const place = searchBox.getPlaces()[0]
        if(place == null) return 
        const lat = place.geometry.location.lat()
        const long = place.geometry.location.lng()
        console.log(lat, long)
    })

// Functions


// checkWeather ((lat, long) => {
    


//     const apiKey = "OmP7CrOzvG40m3NR8WliR5Ws3xv7QFso";
//     const apiUrl = `https://api.tomor.io/v4/timelines?location=${lat},${long}&fields=weatherCode&fields=temperature&fields=humidity&fields=windSpeed&fields=pressureSurfaceLevel&fields=precipitationProbability&timesteps=current&units=metric`;
//     fetch(apiUrl + `&apikey=${apiKey}`).then((res) => {return res.json()}).then((data) => {
//         let weather = data.data.timelines[0].intervals[0].values
//         temperatureElem.textContent = `${weather.temperature} &degC`
//         weatherDescriptionElem.textContent = `${weather.weatherCode}`
//         humidityElem.textContent = `${weather.humidity} %`
//         pressureElem.textContent = `${weather.pressureSurfaceLevel * Math.pow(10, -3)} bar`
//         windSpeedElem.textContent = `${weather.windSpeed} m/s`
//         precipitationElem.textContent = `${weather.precipitationProbability} %`
//     })
    
// })



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





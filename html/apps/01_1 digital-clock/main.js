// Selectors
let hoursElem = document.getElementById("hours");
let minutesElem = document.getElementById("minutes");
let secondsElem = document.getElementById("seconds");
let dateElem = document.getElementById('date')
let dayElem = document.getElementById('day')
let monthElem = document.getElementById('month');
let yearElem = document.getElementById('year');




// Events


// Global variables

const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


// Functions

const formatTime = (value) => value < 10 ? "0" + value : value;

const displayTime = () => {
  let dateTime = new Date()
  let hrs = dateTime.getHours()
  let min = dateTime.getMinutes()
  let sec = dateTime.getSeconds()
  let date = dateTime.getDate()
  let day = dateTime.getDay()
  let month = dateTime.getMonth()
  let year = dateTime.getFullYear()
  console.log('test')

  hoursElem.innerHTML = formatTime(hrs);
  minutesElem.innerHTML = formatTime(min);
  secondsElem.innerHTML = formatTime(sec);
  dateElem.innerHTML = formatTime(date)
  dayElem.innerHTML = days[day]
  monthElem.innerHTML = monthArr[month].toUpperCase();
  yearElem.innerHTML = year;

}

displayTime()
setInterval(displayTime, 1000)
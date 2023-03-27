// Selectors
let hoursHTML = document.getElementById("hours");
let minutesHTML = document.getElementById("minutes");
let secondsHTML = document.getElementById("seconds");
let saveContainer = document.getElementById('saveData');

let btnStart = document.getElementById('start')
let btnStop = document.getElementById('stop')
let btnReset = document.getElementById('reset')
let btnSave = document.getElementById('save')


// Events
btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click', stopTimer);
btnReset.addEventListener('click', resetTimer);
btnSave.addEventListener('click', saveTimer);


// Global variables
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer;


// Functions
const formatTime = (value) => value < 10 ? "0" + value : value


const timeLogic = () => {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }

  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
}

const updateTimeHtml = (seconds, minutes, hours) => {
  secondsHTML.innerHTML = formatTime(seconds);
  minutesHTML.innerHTML = formatTime(minutes);
  hoursHTML.innerHTML = formatTime(hours);
}

// Functions for buttons

// Start button
function startTimer() {
  timer = setInterval(function () {
    timeLogic(); 
    updateTimeHtml(seconds, minutes, hours);
  }, 1000);

  btnStart.disabled = true;
  return timer;
};
 
// Stop button
function stopTimer() {
  clearInterval(timer);
  btnStart.disabled = false;
};



// Reset button
function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
  hours = 0;

  updateTimeHtml(seconds, minutes, hours);
  btnStart.disabled = false;

  while (saveContainer.firstChild) {
    saveContainer.removeChild(saveContainer.firstChild);
  }
};

// Save button
function saveTimer () {
 
  let addSave = document.createElement('div');
  addSave.innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  saveContainer.appendChild(addSave);
};
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;

// Get DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const clearLapsButton = document.getElementById('clearLaps');
const lapTimes = document.getElementById('lapTimes');
const toggleThemeButton = document.getElementById('toggleTheme');

// Start the stopwatch
function startStopwatch() {
  if (isRunning) return; // Prevent multiple intervals
  isRunning = true;
  interval = setInterval(() => {
    milliseconds += 10;

    if (milliseconds >= 1000) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }

    // Update the display
    updateDisplay();
    updateTitle();
  }, 10);
}

// Pause the stopwatch
function pauseStopwatch() {
  clearInterval(interval);
  isRunning = false;
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(interval);
  isRunning = false;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  lapTimes.innerHTML = ''; // Clear lap times
  document.title = 'Stopwatch'; // Reset title
}

// Record a lap time
function recordLap() {
  if (!isRunning) return;
  const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap: ${lapTime}`;
  lapTimes.appendChild(lapItem);
}

// Clear all lap times
function clearLaps() {
  lapTimes.innerHTML = '';
}

// Toggle Dark/Light Mode
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.stopwatch-container').classList.toggle('dark-mode');
}

// Helper functions to format time
function formatTime(unit) {
  return unit < 10 ? `0${unit}` : unit;
}

function formatMilliseconds(unit) {
  return unit < 100 ? `0${Math.floor(unit / 10)}` : Math.floor(unit / 10);
}

// Update the display
function updateDisplay() {
  minutesDisplay.textContent = formatTime(minutes);
  secondsDisplay.textContent = formatTime(seconds);
  millisecondsDisplay.textContent = formatMilliseconds(milliseconds);
}

// Update the title with running time
function updateTitle() {
  document.title = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)} - Stopwatch`;
}

// Event listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
clearLapsButton.addEventListener('click', clearLaps);
toggleThemeButton.addEventListener('click', toggleTheme);

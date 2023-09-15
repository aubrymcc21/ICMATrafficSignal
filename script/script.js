/*
Developer: Aubry McConnell
Last edited date: 9/14/2023
Description: .js file for functions
*/

/* Global variables */
var scriptStarted = false; /*to see if we need to start at green or continue the already-played script*/
var tenSeconds = 10000;
var fiveSeconds = 5000;
var twelveSeconds = 12000;


/* Timer object in order to pause & resume timers */
Timer = function(fn, waitTime) {
    var timerId, startTime, remainingTime = waitTime;
    var pausedOnThis = false;
  
    this.pause = function() {
        if (this.pausedOnThis == true) { /* To prevent double clicking the stop timer causing inaccurate timers */
            return;
        }
        else {
            window.clearTimeout(timerId);
            remainingTime -= new Date() - startTime;
        }
    };
  
    this.resume = function() {
      startTime = new Date();
      timerId = window.setTimeout(fn, remainingTime);
    };
  
    this.resume();
  }; 


/* Initiating timers for each light & pausing them */
var currentlyRedTimer = new Timer(function(){changeColor("green");}, tenSeconds);
currentlyRedTimer.pause();
var currentlyYellowTimer = new Timer(function(){changeColor("red");}, fiveSeconds);
currentlyYellowTimer.pause();
var currentlyGreenTimer = new Timer(function(){changeColor("yellow");}, twelveSeconds);
currentlyGreenTimer.pause();


/* Function to resume the animation that moves the car */
function moveCar() {
    var car = document.getElementById('car');
    car.style.animationPlayState = 'running';
}

/* Function to pause the animation that moves the car */
function stopCar() {
    var car = document.getElementById('car');
    car.style.animationPlayState = 'paused';
}

/* Function that changes the traffic light colors based on timers */
function changeColor(colorType) {
    var redLight = document.getElementById("red");
    var yellowLight = document.getElementById("yellow");
    var greenLight = document.getElementById("green");
    
    if (colorType == "green") { // currently green
        redLight.style.opacity = 0.3;
        yellowLight.style.opacity = 0.3;
        greenLight.style.opacity = 1;  
        moveCar();
        currentlyGreenTimer = new Timer(function(){changeColor("yellow");}, twelveSeconds);  
    }
    else if (colorType == "yellow") { // currently yellow
        redLight.style.opacity = 0.3;
        yellowLight.style.opacity = 1;
        greenLight.style.opacity = 0.3;  
        moveCar();
        currentlyYellowTimer = new Timer(function(){changeColor("red");}, fiveSeconds);
    }
    else if (colorType == "red") { // currently red
        redLight.style.opacity = 1;
        yellowLight.style.opacity = 0.3;
        greenLight.style.opacity = 0.3;  
        stopCar();
        currentlyRedTimer = new Timer(function(){changeColor("green");}, tenSeconds);
    } 
}

  /* Function to continue the stop light animations upon clicking the Start button */
  function beginScript() {
    if (scriptStarted == false) { /* if the script has not yet been ran, start from the beginning */
        scriptStarted = true;
        changeColor("green");
    }
    else { /* otherwise find the timer we paused on and resume it */
        if (currentlyRedTimer.pausedOnThis == true) {
            currentlyRedTimer.pausedOnThis = false;
            currentlyRedTimer.resume();
        }
        else if (currentlyYellowTimer.pausedOnThis == true) {
            currentlyYellowTimer.pausedOnThis = false;
            moveCar();
            currentlyYellowTimer.resume();
        }
        if (currentlyGreenTimer.pausedOnThis == true) {
            currentlyGreenTimer.pausedOnThis = false;
            moveCar();
            currentlyGreenTimer.resume();
        }
    }
}

/* Function to stop the stop light animations upon clicking the Stop button */
function stopScript() {
    var redLight = document.getElementById("red");
    var yellowLight = document.getElementById("yellow");
    var greenLight = document.getElementById("green");

    stopCar();

    if (redLight.style.opacity == 1) {
        currentlyRedTimer.pause();
        currentlyRedTimer.pausedOnThis = true;
    }
    else if (yellowLight.style.opacity == 1) {
        currentlyYellowTimer.pause();
        currentlyYellowTimer.pausedOnThis = true;
    }
    if (greenLight.style.opacity == 1) {
        currentlyGreenTimer.pause();
        currentlyGreenTimer.pausedOnThis = true;
    }
}
/*
*  Node JS Home Automation server running on Raspberry Pi
*  
* **************************
* *  Still in Development **
* **************************
*
*/

var DashButton = require('dash-button');
let config = require('./config');
var daylightDetector = require('./scripts/DaylightDetector');


let mac_address = config.dash_button.mac;

console.log("Retrieved Dash button MAC address: " + mac_address);

let button = new DashButton(mac_address);

// console.log("\nListening for button presses...");
// let subscription = button.addListener(async () => {
//     console.log("Button pressed!\n");
// });

// Daylight Detector will exist within the button event listener
let apiToken = config.OpenWeatherMap.api;
let city = "Seattle";
var sunriseInSeconds;

daylightDetector.getSunrise(city, apiToken, function(response) {
    console.log("Sunrise: ", response);
});
daylightDetector.getSunset(city, apiToken, function(response) {
    console.log("Sunset: ", response);
});
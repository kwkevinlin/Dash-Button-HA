/*
*  Node JS Home Automation server running on Raspberry Pi
*  
* **************************
* *  Still in Development **
* **************************
* 
*  This script allows the usage of an Amazon dash button to
*  manually open and close venetian blinds. This script also
*  contains an automation that runs twice a day, gathering
*  data on the time of sunrise and sunset. Once retrieved,
*  the data is used to automate the opening and closing of
*  the venetian blinds every morning and night, respectively.
*
*  Deciding on whether to split the project into two distinct
*  portions -- the Node JS server that handles the dash button
*  clicks and other misc HA tasks, and the sunrise/sunset
*  automation that runs via the cron.
*/

let config = require('./config');
let cron = require('./scripts/cron');
let endpoint = require('./apps/apps');
let DashButton = require('dash-button');
let daylightDetector = require('./scripts/DaylightDetector');
let blindsController = require('./scripts/BlindsController');


// Automation
let apiToken = config.OpenWeatherMap.api;
let city = "Seattle";
var sunriseInSeconds;

daylightDetector.getSunrise(city, apiToken, function(response) {
    console.log("Sunrise: ", response);
});
daylightDetector.getSunset(city, apiToken, function(response) {
    console.log("Sunset: ", response);
});

cron.setDailyAutomationCron();


// Dash Button Listener
let mac_address = config.dash_button.mac;
let button = new DashButton(mac_address);

console.log("\nListening for button presses...");

let subscription = button.addListener(async () => {
    console.log("\nButton pressed!");
    blindsController.moveBlinds();
    blindsController.getBlindsState(function(state) {
        console.log("Current Blinds State: " + state);
    });
});


/*
    TODO:
    node-cron
*/

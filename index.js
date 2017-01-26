/*
*  Node JS Home Automation server running on Raspberry Pi
*  
* ********************
* *  In Development **
* ********************
* 
*  This script allows the usage of Amazon dash buttons to
*  manually open and close venetian blinds. This script also
*  contains an automation that runs twice a day, gathering
*  data on the time of sunrise and sunset. Once retrieved,
*  the data is used to automate the opening and closing of
*  blinds every morning and night.
*
*/

let config = require('./config');
let cron = require('./scripts/Cron');
let endpoint = require('./apps/apps');
let DashButton = require('dash-button');
let blindsController = require('./scripts/BlindsController');


/*
    This is a quick temp commit. Just want to get Hue automation working for now!
    Todo
    Hue on - 100% brightness
    Ping notify if lights are on during work hours
    Get IP address of request sender
    Work on modularizing
    Refactor, especially HueControl
    Hue turnOn print/return "All lights off" if all lights off
*/

// Automate blinds cron job
// cron.setDailyAutomationCron();


// Dash Button Listener
let macAddress = config.dashButton.supergoop;
let buttonSupergoop = new DashButton(macAddress);

console.log("Listening for Dash presses...");

let subscription = buttonSupergoop.addListener(async () => {
    console.log("\Supergood button pressed!");
    blindsController.moveBlinds();
    blindsController.getBlindsState(function(state) {
        console.log("Current Blinds State: " + state);
    });
});

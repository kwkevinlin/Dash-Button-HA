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
let hueControl = require('./scripts/HueControl');


/*
    This is a work in progress!
    Todo
    Get IP address of request sender
    Work on modularizing
    Refactor, especially HueControl
*/

// Automate blinds cron job
// cron.setDailyAutomationCron();


// Dash Button Listener
let macAddressSupergoop = config.dashButton.supergoop;
let macAddressBanana = config.dashButton.banana;
let buttonSupergoop = new DashButton(macAddressSupergoop);
let buttonBanana = new DashButton(macAddressBanana);

console.log("Listening for Dash presses...");

let subscription = buttonSupergoop.addListener(async () => {
    console.log("Supergoop button pressed!");
    //Lights
    hueControl.turnOn();
    // Blinds
    blindsController.moveBlinds();
    blindsController.getBlindsState(function(state) {
        console.log("Current Blinds State: " + state);
    });
});

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
*/

let config = require('./config');
let cron = require('./scripts/cron');
let endpoint = require('./apps/apps');
let DashButton = require('dash-button');
let blindsController = require('./scripts/BlindsController');


// Automate blinds cron job
cron.setDailyAutomationCron();


// Dash Button Listener
let macAddress = config.dashButton.mac;
let button = new DashButton(macAddress);

console.log("Listening for Dash presses...");

let subscription = button.addListener(async () => {
    console.log("\nButton pressed!");
    blindsController.moveBlinds();
    blindsController.getBlindsState(function(state) {
        console.log("Current Blinds State: " + state);
    });
});

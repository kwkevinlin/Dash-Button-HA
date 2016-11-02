/*
*  Node JS Home Automation server running on Raspberry Pi
*  
* **************************
* *  Still in Development **
* **************************
*
*/

var DashButton = require('dash-button');
let config = require('./config')

let mac_address = config.dash_button.mac;

console.log("Retrieved Dash button MAC address: " + mac_address);

let button = new DashButton(mac_address);

console.log("\nListening for button presses...");

// Daylight Detector will exist within the button event listener below

let subscription = button.addListener(async () => {
    console.log("Button pressed!\n");
});

/*
*  Node JS Home Automation server running on Raspberry Pi
*  
*
*  TODO:
*    Setup server to listen to Amazon Dash button clicks
*    Babel (https://github.com/babel/example-node-server)
*/

var DashButton = require('dash-button');
let mac_address = require('./config').dash_button.mac;

console.log("Retrieved Dash button MAC address: " + mac_address);

let button = new DashButton(mac_address);

console.log("\nListening for button presses...");

let subscription = button.addListener(async () => {
    console.log("Button pressed!\n");
});

/*
*   apps.js
*   Kevin Lin
*
*/
var express = require('express');
var app = express();
let hue = require('../scripts/HueControl');
let blindsController = require('../scripts/BlindsController');

app.get('/', function(req, res) {
    console.log("\nEndpoint '/' hit  (Time: " + currentTime() + ")\n" + 
                "Response: 'Invalid endpoint'.");
    sendStatus400(res, "Invalid endpoint. You blew it!");
});

app.get('/hue/:action', function(req, res) {
    var action = req.params.action;
    console.log("\nEndpoint '/hue/" + action + "' hit  (Time: " + currentTime() + ")\n");

    if (action == "on") {
        hue.turnOn(function(state) {
        });
    }
    else if (action == "off") {
        hue.turnOff(function(state) {
        });
    }
    else {
        console.log("Response: 'Invalid action'.");
        sendStatus400(res, "Invalid action. Please use 'on' or 'off' to control the lights.");
    }

    res.status(200).send({
        Status: "Success"
    });
});

app.get('/blinds/state', function(req, res) {
    blindsController.getBlindsState(function(state) {
        console.log("\nEndpoint '/blinds/state' hit   (Time: " + currentTime() + ")\n" +
                    "Response: '" + state + "'.");
        res.status(200).send({
            State: state
        });
    });
});

app.get('/blinds/:action', function(req, res) {
    var action = req.params.action;
    console.log("\nEndpoint '/blinds/" + action + "' hit  (Time: " + currentTime() + ")\n");

    if (action == "move") {
        // Auto-determines blind state and moves accordingly
        blindsController.moveBlinds();
    }
    else if (action == "open") {
        blindsController.openBlinds();
    }
    else if (action == "close") {
        blindsController.closeBlinds();
    } 
    else if (!isNaN(action)) {
        var percent = parseInt(action);
        if (percent < 0 || percent > 100) {
            console.log("Response: 'Invalid percentage given'.");
            sendStatus400(res, "Invalid percentage given. Percentage can only be from 0 to 100.");
        }
        blindsController.moveByPercent(action);
    }
    else {
        console.log("Response: 'Invalid action'.");
        sendStatus400(res, "Invalid action. Please use 'move', or 'open' / 'close' for specific actions.");
    }

    res.status(200).send({
        Status: "Success"
    });
});

app.listen(7000);
console.log('Listening on port 7000...');

function sendStatus400(res, message) {
    res.status(400).send( { 
        error: message
    });
}

function currentTime() {
    return new Date(new Date().getTime()).toLocaleString();
}

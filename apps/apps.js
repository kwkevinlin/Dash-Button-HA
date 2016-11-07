/*
*   apps.js
*   Kevin Lin
*
*/
var express = require('express');
var app = express();
let blindsController = require('../scripts/BlindsController');

app.get('/', function(req, res) {
    console.log("\nEndpoint '/' hit\nResponse: 'Invalid endpoint'.");
    sendStatus400("Invalid endpoint. You blew it!");
});

app.get('/blinds/state', function(req, res) {
    blindsController.getBlindsState(function(state) {
        console.log("\nEndpoint '/blinds/state' hit\nResponse: '" + state + "'.");
        res.status(200).send({
            State: state
        });
    });
});

app.get('/blinds/:action', function(req, res) {
    console.log("\nEndpoint '/blinds/" + action + "' hit\n");
    var action = req.params.action;

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
            sendStatus400("Invalid percentage given. Percentage can only be from 0 to 100.");
        }
        blindsController.moveByPercent(action);
    }
    else {
        console.log("Response: 'Invalid action'.");
        sendStatus400("Invalid action. Please use 'move', or 'open' / 'close' for specific actions.");
    }

    res.status(200).send({
        Status: "Success"
    });
});

app.listen(7000);
console.log('Listening on port 7000...');

function sendStatus400(message) {
    res.status(400).send( { 
        error: message
    });
}

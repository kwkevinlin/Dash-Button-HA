/*
*   apps.js
*   Kevin Lin
*
*/
var express = require('express');
var app = express();
let blindsController = require('../scripts/BlindsController');

app.get('/', function(req, res) {
    console.log("\nEndpoint '/' hit\nResponse: 'Invalid endpoint'");
    res.status(400).send( { 
        error: "Invalid endpoint. You blew it!"
    });
});

app.get('/blinds/state', function(req, res) {
    blindsController.getBlindsState(function(state) {
        console.log("\nEndpoint '/blinds/state' hit\nReturning: '" + state + "'");
        res.status(200).send({
            State: state
        });
    });
});

app.get('/blinds/action', function(req, res) {
    console.log("\nEndpoint '/blinds/action' hit\nResponse: 'Invalid endpoint'");
    res.status(400).send( { 
        error: "Invalid endpoint. You are probably looking for '/blinds/action/:action', " +
               "where a valid action is 'move', 'open', or 'close'."
    });
});

app.get('/blinds/action/:action', function(req, res) {
    console.log("\nEndpoint '/blinds/action/" + action + "' hit\n");
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
    else {
        console.log("Response: 'Invalid action'\n");
        res.status(400).send( { 
            error: "Invalid action. Please use 'move', or 'open' / 'close' for specific actions."
        });
    }

    res.status(200).send({
        Status: "Success"
    });
});

app.listen(7000);
console.log('Listening on port 7000...');

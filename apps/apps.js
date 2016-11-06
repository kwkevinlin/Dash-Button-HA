/*
*   apps.js
*   Kevin Lin
*
*/
var express = require('express');
var app = express();
let blindsController = require('../scripts/BlindsController');

app.get('/', function(req, res) {
    res.status(400).send( { error: 'Invalid endpoint. You blew it!' });
});

app.get('/blinds/state', function(req, res) {
    blindsController.getBlindsState(function(state) {
        console.log(state);
        res.send(state);
    });
});

app.listen(7000);
console.log('Listening on port 7000...');
/*
*   HueControl.js
*   Kevin Lin
*
*/
var request = require('request');
let hueUser = require('../config').hue.user;

var lastCallTimestamp;

module.exports = {
    turnOn: function (brightness) {
        if (!isValidCall()) {
            return;
        }
        turnOnAllLights(brightness);
    },

    turnOff: function () {
        turnOffAllLights();
    }
};

var isValidCall = function() {
    let now = new Date();
    if (now.getHours() < 12) {
        return false;
    }
    let hoursFromLastCall = (now - lastCallTimestamp) / 60*60*1000;
    if (now.getHours() >= 22 && hoursFromLastCall < 3) {
        return false;
    }
    return true;
};

var turnOnAllLights = function (brightness) {
    let baseUrl = "http://192.168.1.228/api/";
    let url = baseUrl + hueUser;
    
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            response = JSON.parse(body).lights;
            for (var light in response) {
                if (response[light].state.on === false) {
                    console.log("Turning " + response[light].name + " on!");
                    changeBulbState("on", light, brightness);
                }
            }
        } else {
            // Turn this into a callback and return if Hue's API fail
            console.log("Hue API! You have failed me.");
        }
    });

    lastCallTimestamp = new Date();
};

var turnOffAllLights = function (brightness) { 
    let baseUrl = "http://192.168.1.228/api/";
    let url = baseUrl + hueUser;
    
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            response = JSON.parse(body).lights;
            for (var light in response) {
                if (response[light].state.on === true) {
                    console.log("Turning " + response[light].name + " off!");
                    changeBulbState("off", light);
                }
            }
        } else {
            // Turn this into a callback and return if Hue's API fail
            console.log("Hue API! You have failed me.");
        }
    });
};

var changeBulbState = function (state, bulb, brightness = null) {
    let baseUrl = "http://192.168.1.228/api/";
    let url = baseUrl + hueUser + "/lights/" + bulb + "/state";

    if (state == "on") {
        body = "{\"on\":true, \"bri\":" + getBrightnessValue(brightness) + "}";
    }
    else {
        body = "{\"on\":false}";
    }

    var request = require('request');
    request.put({url, body: body}, function(error, response, body) {
        if (error || response.statusCode != 200) {
            // Turn this into a callback
            console.log("Hue API! You have failed me.");
        }
    });
};

var getBrightnessValue = function (percent) {
    return Math.round(percent / 100.0 * 254);
};

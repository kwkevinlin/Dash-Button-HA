/*
*   DaylightDetectory.js
*   Kevin Lin
*
*/
var request = require('request');

module.exports = {
    getSunrise: function (city, apiToken, callback) {
        console.log("getSunrise");
        makeWeatherApiCall(city, apiToken, function(response) {
            callback(response.sunrise);
        });
    },

    getSunset: function (city, apiToken, callback) {
        console.log("getSunset");
        makeWeatherApiCall(city, apiToken, function(response) {
            callback(response.sunset);
        });
    }
};

var makeWeatherApiCall = function (city, apiToken, callback) {
    let apiBaseUrl = "http://api.openweathermap.org/data/2.5/weather?";
    let url = apiBaseUrl + "q=" + city + "&appid=" + apiToken;
    
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Why is body not in JSON? Need explicit convert?
            callback(JSON.parse(body).sys);
        } else {
            callback("Bloody error! Could not get API response from Open Weather Map.");
        }
    });
};

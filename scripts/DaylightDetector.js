/*
*   DaylightDetectory.js
*   Kevin Lin
*
*/

module.exports = {
    getSunrise: function (city, apiToken, callback) {
        console.log("getSunrise");

        let apiBaseUrl = "http://api.openweathermap.org/data/2.5/weather?";
        let url = apiBaseUrl + "q=" + city + "&appid=" + apiToken;

        var request = require('request');
        
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Why is body not in JSON? Need explicit convert?
                console.log("Got response: ", JSON.parse(body).sys.sunrise);
                callback(JSON.parse(body).sys.sunrise);
            } else {
                callback("Bloody error! Could not get sunrise time.");
            }
        });
    },

    getSunset: function (city, apiToken) {
        console.log("getSunset");
        // Make below async
        // response = makeWeatherApiCall(city, apiToken);
        // return response.sys.sunset;
    }
};

var makeWeatherApiCall = function (city, apiToken) {
    // Put API call here
};

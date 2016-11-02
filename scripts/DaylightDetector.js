/*
*   DaylightDetectory.js
*   Kevin Lin
*
*/

class DaylightDetector {

    var apiBaseUrl = "http://api.openweathermap.org/data/2.5/weather?";

    constructor(api, city) {
        this.apiToken = api;
        this.city = city;
    }

    function getSunrise() {
        response = _makeApiCall();
        let sunrise = response.sys.sunrise;
    }

    function getSunset() {
        response = _makeApiCall();
        let sunset = response.sys.sunset;
    }

    function _makeApiCall() {
        url = this.apiBaseUrl + "q=" + this.city + "&appid=" + this.apiToken;

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
}

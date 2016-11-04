/*
*   BlindsController.js
*   Kevin Lin
*
*/
var currentBlindsState = "closed";

module.exports = {
    moveBlinds: function () {
        if (currentBlindsState == "closed") {
            openBlinds();
            currentBlindsState = "opened";
            console.log("Blinds opened");
        } else {
            closeBlinds();
            currentBlindsState = "closed";
            console.log("Blinds closed");
        }
    },

    getBlindsState: function (callback) {
        callback(currentBlindsState);
    }
};


var openBlinds = function() {
    console.log("Opening blinds...");
};

var closeBlinds = function() {
    console.log("Closing blinds...");
};
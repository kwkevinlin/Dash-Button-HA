/*
*   BlindsController.js
*   Kevin Lin
*
*/
var currentBlindsState = "closed";
var blindsStateInPercent = 0;

module.exports = {
    moveBlinds: function () {
        if (currentBlindsState == "closed") {
            this.openBlinds();
            currentBlindsState = "opened";
            console.log("Blinds opened");
        } else {
            this.closeBlinds();
            currentBlindsState = "closed";
            console.log("Blinds closed");
        }
    },

    openBlinds: function() {
        console.log("Opening blinds...");
    },

    closeBlinds: function() {
        console.log("Closing blinds...");
    },

    moveByPercent: function(percent) {
        // 0 = close, 100 = open
        console.log("Moving blinds to " + percent + "% open...");
    },

    getBlindsState: function (callback) {
        callback(currentBlindsState);
    }
};

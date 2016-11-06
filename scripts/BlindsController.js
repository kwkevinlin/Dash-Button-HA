/*
*   BlindsController.js
*   Kevin Lin
*
*/
var currentBlindsState = "closed";

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


    getBlindsState: function (callback) {
        callback(currentBlindsState);
    }
};

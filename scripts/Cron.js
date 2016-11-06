/*
*   Cron.js
*   Kevin Lin
*
*/
let CronJob = require('cron').CronJob;
let daylightDetector = require('./DaylightDetector');
let blindsController = require('./BlindsController');

module.exports = {
    setDailyAutomationCron: function () {
        /* Prod will be using:
               0 30 4,16 * * *
               Every day at 4:30 am and 4:30 pm 
        */
        var job = new CronJob('*/5 * * * * *', function() {
            console.log('You will see this message every five seconds');
            blindsController.moveBlinds();

            // Get sunrise, sunset time
            // var job = new CronJob(new Date(), function() {} .. );
            // Run once at time
        }, null, true, 'America/Los_Angeles');
    }
};

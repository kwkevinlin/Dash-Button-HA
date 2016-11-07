/*
*   Cron.js
*   Kevin Lin
*
*/
let config = require('../config');
let CronJob = require('cron').CronJob;
let daylightDetector = require('./DaylightDetector');
let blindsController = require('./BlindsController');

module.exports = {
    setDailyAutomationCron: function () {
        /* Prod will be using:
               0 30 4,16 * * *
               Every day at 4:30 am and 4:30 pm 
        */
        var dailyCron = new CronJob('*/10 * * * * *', function() {
            console.log('You will see this message every five seconds');

            let city = config.openWeatherMap.city;
            let apiToken = config.openWeatherMap.api;

            var currentHour = new Date().getHours();
            if (currentHour < 12) {
                daylightDetector.getSunrise(city, apiToken, setOneTimeCron);
            } else {
                daylightDetector.getSunset(city, apiToken, setOneTimeCron);
            }
        }, null, true, 'America/Los_Angeles');
    }
};

function setOneTimeCron(utcSeconds) {
    // For test
    // var nextScheduledJob = new Date();
    // nextScheduledJob.setSeconds(nextScheduledJob.getSeconds() + 3);
    // console.log("New time: ", nextScheduledJob.toString())

    var nextScheduledJob = new Date(utcSeconds * 1000);

    var oneTimeCron = new CronJob(nextScheduledJob, function() {
        blindsController.moveBlinds();
    }, null, true, 'America/Los_Angeles');

    console.log("Scheduled next moveBlinds job at:", nextScheduledJob.toString());
}

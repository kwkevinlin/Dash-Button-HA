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
        var dailyCron = new CronJob('*/5 * * * * *', function() {
            console.log('You will see this message every five seconds');

            let city = config.OpenWeatherMap.city;
            let apiToken = config.OpenWeatherMap.api;

            var current_hour = new Date().getHours();
            if (current_hour < 12) {
                daylightDetector.getSunrise(city, apiToken, setOneTimeCron);
            } else {
                daylightDetector.getSunset(city, apiToken, setOneTimeCron);
            }
        }, null, true, 'America/Los_Angeles');
    }
};

function setOneTimeCron(utcSeconds) {
    // For test
    // var next_scheduled_job = new Date();
    // next_scheduled_job.setSeconds(next_scheduled_job.getSeconds() + 3);
    // console.log("New time: ", next_scheduled_job.toString())

    var next_scheduled_job = new Date(utcSeconds * 1000);

    var oneTimeCron = new CronJob(next_scheduled_job, function() {
        blindsController.moveBlinds();
    }, null, true, 'America/Los_Angeles');

    console.log("Scheduled next moveBlinds job at ", next_scheduled_job.toString());
}

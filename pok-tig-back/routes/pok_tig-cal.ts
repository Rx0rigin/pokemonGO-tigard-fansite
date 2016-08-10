/**
 * A HACKd.design server component to get data from Google API
 * @author {email} rob@hackd.design
 * 2016 MIT
 */ 
  ////////
 /// DB Connection
////////
/**
 * Declaring connection to the database
 */
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./hackd-pt.db"
    }
});
var bookshelf = require('bookshelf')(knex);
var express = require('express');
var router = express.Router();
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
module.exports = router;
  ////////
 /// A P I
////////
/**
 * Makes a call to googleapis and lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
    var calendar = google.calendar('v3');
    calendar.events.list({
        auth: auth,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var events = response.items;
        if (events.length == 0) {
            console.log('No upcoming events found.');
        }
        else {
            console.log('Upcoming 10 events:');
            for (var i = 0; i < events.length; i++) {
                var event_1 = events[i];
                var start = event_1.start.dateTime || event_1.start.date;
                console.log('%s - %s', start, event_1.summary);
            }
        }
    });
}
/**
 *
 * Returns a calendar data object
 *
 * @param {google.auth.OAuth2} auth
 *
 */
function updateCalendarEvents(auth) {
    // Make a calendar query/object.  
    var calendar_hackd = google.calendar('v3');
    calendar_hackd.events.list({
        auth: auth,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 1000,
        singleEvents: true,
        orderBy: 'startTime'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        console.log("updateCalendarEvents Fired");
        return response.items;
    });
}
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('Poke\'mon Online');
});
/**
 * Returns a JSON data object containing calendar events
 */
router.route('/calendar-data')
    .get(function (req, res) {
    let eventsItems  = updateCalendarEvents();
    // Do Bookshelf Stuff
    res.json(listEvents);
    // res.send('Calendar Data Accessed');
})
    .post(function (req, res) {
});

  ///////
 // Models 
///////

var User = bookshelf.Model.extend({
  tableName: 'users',
  posts: function() {
    return this.hasMany(Posts);
  }
});

var Posts = bookshelf.Model.extend({
  tableName: 'messages',
  tags: function() {
    return this.belongsToMany(Tag);
  }
});

var Tag = bookshelf.Model.extend({
  tableName: 'tags'
});


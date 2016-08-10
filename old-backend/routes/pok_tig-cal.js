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
    var eventsItems = updateCalendarEvents();
    // Do Bookshelf Stuff
    res.json(listEvents);
    // res.send('Calendar Data Accessed');
})
    .post(function (req, res) {
});
///////
// Models 
///////
var calendarEvents = bookshelf.Model.extend({
    tableName: 'calendarEvents',
    
});
////////////////
// User Route ////
//////////////
/***

router.route('/users')
    .get(function (req, res) {
    Users.forge()
        .fetch()
        .then(function (collection) {
        res.json({ error: false, data: collection.toJSON() });
    })
        .catch(function (err) {
        res.status(500).json({ error: true, data: { message: err.message } });
    });
})
    .post(function (req, res) {
    User.forge({
        name: req.body.name,
        email: req.body.email
    })
        .save()
        .then(function (user) {
        res.json({ error: false, data: { id: user.get('id') } });
    })
        .catch(function (err) {
        res.status(500).json({ error: true, data: { message: err.message } });
    });
});
router.route('/users/:id')
    .get(function (req, res) {
    User.forge({ id: req.params.id })
        .fetch()
        .then(function (user) {
        if (!user) {
            res.status(404).json({ error: true, data: {} });
        }
        else {
            res.json({ error: false, data: user.toJSON() });
        }
    })
        .catch(function (err) {
        res.status(500).json({ error: true, data: { message: err.message } });
    });
})
    .put(function (req, res) {
    User.forge({ id: req.params.id })
        .fetch({ require: true })
        .then(function (user) {
        user.save({
            name: req.body.name || user.get('name'),
            email: req.body.email || user.get('email')
        })
            .then(function () {
            res.json({ error: false, data: { message: 'User details updated' } });
        })
            .catch(function (err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });
    })
        .catch(function (err) {
        res.status(500).json({ error: true, data: { message: err.message } });
    });
})
    .delete(function (req, res) {
    User.forge({ id: req.params.id })
        .fetch({ require: true })
        .then(function (user) {
        user.destroy()
            .then(function () {
            res.json({ error: true, data: { message: 'User successfully deleted' } });
        })
            .catch(function (err) {
            res.status(500).json({ error: true, data: { message: err.message } });
        });
    })
        .catch(function (err) {
        res.status(500).json({ error: true, data: { message: err.message } });
    });
});
process.stderr.on('data', function (data) {
    console.log(data);
});
    */

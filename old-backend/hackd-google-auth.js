/**
 * HACKd presents a Google OAuth2 and GoogleMapsAPI routine 
 * 
 * A stand-alone file that validates a user for Google's API
 * edited by rob@hackd.design 
 */
     ///////////
    //  BOOKSHELF and KNEX
   ///////////
/**
 * Knex.js connection to DB.
 *  
 */   
let knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./hackd-pt.db"
    }
});
// DB Dependacies
let bookshelf = require('bookshelf')(knex);
/**
 * Create a knex table to store calendar data in.
knex.schema.createTableIfNotExists('calendarEvents', function(table){
    table.increments();
    table.number('calendar_id');
    table.string('label');
    table.string('dateTime');
    table.timestamps();
})
 */
/**
 * Make a Bookshelf model for the calendarTable.
 * 
 */
let Calendar = bookshelf.Model.extend({
    tableName: 'calendarEvents',
    hasTimestamps: true,
    displayLabel: function(){
        return this.get('label') || 'no label';
    }
})

let temp = Calendar.displayLabel;
console.log(temp);

     ////////////
    //  OAuth2 Token Refresher
   ////////////

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var SECRET_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/rxshh/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
// Load client secrets from a local file.
fs.readFile(SECRET_DIR + 'client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    authorize(JSON.parse(content), listEvents);
});
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        }
        else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
}
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}
/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    }
    catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}
/**
 * Lists the next 10 events on the user's primary calendar.
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
                var event = events[i];
                var start = event.start.dateTime || event.start.date;
                console.log('%s - %s', start, event.summary);
            }
        }
    });
}
/**
 *
 * Gets and returns a JSON object from googleapis
 *
 * @param {google.auth.OAuth2} auth
 *
 */
function getEvents(auth, callback) {
    var calendar_hackd = google.calendar('v3');
    // calendar.events.list;
}

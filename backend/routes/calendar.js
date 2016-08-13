/**
 * Calendar Component API for PokemonGO Tigard Fansite
 * by Rob@hackd.design
 */
let express = require('express');
let router = express.Router();
//let CalendarEvent = require('../models/calendar-event');
let Calendar = require('../models/calendar');
let Event = require('../models/calendar-event');
/**
 * Gets all the events from the database 
 */
router.get('/', function(req, res, next) {
    new Event().fetchAll()
    .then(function(events) {
        res.send(events.toJSON());
    }).catch(function(er) {
        res.send("This calendar GET escaped! " + er);
    }) 
})
/**
 * Saves a new Event to the db
 * 
 * @param { req } body
 * 
 */
router.post('/', function(req, res, next) {
    new Event()
    .set('label', req.body.label)
    .set('date', req.body.date)
    .save().then(function(model){
        console.log('Event Saved: ' + model.get('body'));
        res.send('event saved');
    }).catch(function(er){
        res.send('calendar error ' + er);
    })
});

module.exports = router;
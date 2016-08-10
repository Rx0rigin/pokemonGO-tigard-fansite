let Model = require('./base');


let Calendar = Model.extend({
tablename: 'calendar'
})

let CalendarEvents = Model.extend({
    tablename: 'calendarEvents',
    calendarEvents: function(){
        return this.hasMany(CalendarEvent);
    }
})

let CalendarEvent = require('../models/calendar-event');

module.exports = CalendarModel;

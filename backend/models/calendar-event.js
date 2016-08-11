let bookshelf = require('../init/bookshelf');
let Model = require('./base');


let CalendarEvent = bookshelf.Model.extend({
    tablename: 'calendarEvent'
});

module.exports = CalendarEvent;
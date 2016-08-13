let bookshelf = require('../init/bookshelf');
let Model = require('./base');


let CalendarEvent = bookshelf.Model.extend({
    tableName: 'calendarEvent'
    //,hasTimestamps: true

});

module.exports = CalendarEvent;
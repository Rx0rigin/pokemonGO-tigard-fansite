let bookshelf = require('../init/bookshelf');
let Model = require('./base');


let Calendar = bookshelf.Model.extend({
    tableName: 'calendar'
});


module.exports = Calendar;

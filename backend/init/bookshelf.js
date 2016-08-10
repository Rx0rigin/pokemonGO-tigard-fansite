/**
 * The db connection and ORM layer init.
 */
let knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './hackd-pok.db'
    }
});
let bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

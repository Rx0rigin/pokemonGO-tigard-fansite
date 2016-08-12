let bookshelf = require('../init/bookshelf');
let Model = require('./base');

let Article = bookshelf.Model.extend({
    tableName: 'articles'
});

module.exports = Article;
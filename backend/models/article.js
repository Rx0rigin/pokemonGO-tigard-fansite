let bookshelf = require('../init/bookshelf');
let Model = require('./base');

let Article = bookshelf.Model.extend({
    tableName: 'articles',
    hasTimestamps: true  
});

module.exports = Article;
let express = require('express');
let router = express.Router();
let bookshelf = require('../init/bookshelf');
let Article = require('../models/Article');

/**
 * GET all articles in the db and return a JSON
 */
router.get('/', function(res, req, next) {
    new Article().fetchAll()
    .then(function(articles) {
        res.send(articles.toJSON());
    }).catch(function(er){
        res.send('Article Get Error' + er);
    }); 
});
/**
 *  Take a POST and save to the db.
 * 
 */
router.post('/post', function(res, req, next) {


});
let express = require('express');
let router = express.Router();
let bookshelf = require('../init/bookshelf');
let Article = require('../models/article');

/**
 * GET all articles in the db and return a JSON
 */
router.get('/', function(req, res, next) {
    new Article().fetchAll()
  .then(function(articles) {
    res.send(articles.toJSON());
  }).catch(function(error){
    console.log(error);
    res.send('An error occured');
  });
});
/**
 *  Take a POST and save to the db.
 * 
 */
router.post('/', function(res, req, next) {
    var article = new Article();
        article.set('body', req.body.body);
        article.set('author', req.body.author);

    article.save().then( function(err) {
        if(err)
        res.send(err);
        res.json({ responseMessage: 'Article Saved'});
    });
});
    
module.exports = router;
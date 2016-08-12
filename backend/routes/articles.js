let express = require('express');
let router = express.Router();
// let bookshelf = require('../init/bookshelf');
let Article = require('../models/article');
/**
 * GET all articles in the db and return a JSON
 */ 
router.get('/', function (req, res, next) {
    new Article().fetchAll()
  .then(function(articles) {
    res.send(articles.toJSON());
  }).catch(function(error){
    console.log(error);
    res.send('An error occurred in articles' + error);
  });
});
/**
 *  Take a POST and save to the db.
 * 
 */
router.post('/', function(req, res, next) {
    console.dir(req.body);
    let article = new Article();
    article.set('body', req.body.body);
    article.set('author', req.body.author);
    article.save().then(function savedArticleSuccess(suc) {
      console.log('Aritcle Saved: ' + suc.get('body'));
    });
    res.send('success save');
});
module.exports = router;
var express = require('express');
var router = express.Router();

var bookGoogle = require('google-books-search');

//var session = require('express-session');
//var FileStore = require('session-file-store')(session);

var Book = require('../models/book');

/* GET home page. */
router.get('/read', function(req, res, next) {
  Book.find(function (err, docs) {
    res.json(docs);
  });
});

router.get('/readMyBooks', function(req, res, next) {
  Book.find({subscriber:req.session._id},function (err, docs) {
    if(err)
      console.log(err);
    res.json(docs);
    console.log(docs);
  });
});

router.delete('/delete/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  Book.remove({ _id: id }, function(err) {
    if (!err) {
      res.json('deleted!');
    } else {
      res.json(err);
    }
  });

});

router.post('/add', function(req, res, next) {
  bookGoogle.search(req.body.name,function(error,results){
    if(error) {
      console.log(error);
      res.send(error);
    }
    //console.log(results[0]);
    var result = results[0];
    var book = new Book({
      _id : result.id,
      title : result.title,
      name : result.name,
      thumbnail : result.thumbnail,
      link : result.link,
      subscriber: req.session._id
    });
    book.save(function(err){
      if(err) {
        if(err.code == 11000) {
          return res.json({success:false,message:'bookname already exists'});
        }
        else
          res.send(err);
      }

      res.json({message:'book Created'});
    });
  });
});

module.exports = router;

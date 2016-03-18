var express = require('express');
var router = express.Router();

//var session = require('express-session');
//var FileStore = require('session-file-store')(session);

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req.session.username);
  if((req.session.username!=undefined) && (req.session.password!=undefined)){
    res.redirect('dashboard');
  }else{
    res.render('index');
  }
});


router.post('/login', function(req, res, next) {
  console.log('Login Post');
  User.findOne({username:req.body.username, password:req.body.password},function(err, docs){
    if(docs==null){
      res.json("Error! Username and password doesn't match!");
    }else{
      req.session.username = docs.username;
    }
  });
});

router.get('/logout',function(req, res, next){
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;

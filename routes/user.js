var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session._id);
  res.send(req.session._id);
  //res.redirect('/');
});

router.post('/register', function(req, res, next) {
    console.log('Save Post');
    var user = new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        phone:req.body.phone
    });

    user.save(function (err) {
        if (!err) {
            res.json('created');
        } else {
            res.json(err);
        }
    });
});

router.post('/login', function(req, res, next) {
  console.log('Login Post');
  User.findOne({username:req.body.username, password:req.body.password},function(err, docs){
    if(docs==null){
      res.json(null);
    }else{
      res.json(docs);
    }
  });
});

router.get('/logout',function(req, res, next){
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;

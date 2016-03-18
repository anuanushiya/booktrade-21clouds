var express = require('express');
var router = express.Router();

//var session = require('express-session');
//var FileStore = require('session-file-store')(session);

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req.session.username);
  if((req.session.username!=undefined) && (req.session.password!=undefined)){
    res.render('setting');
  }else{
    res.redirect('dashboard');
  }
});


router.get('/read', function(req, res, next) {
  console.log('Login Post');
  User.findOne({_id:req.session._id},function(err, docs){
    res.json(docs);
  });
});

router.put('/update/:id', function(req, res){
  var id = req.params.id;
  User.findByIdAndUpdate(id, { $set: {
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    phone:req.body.phone,
    city:req.body.city,
    state:req.body.state
  }}, function (err, docs) {
    res.json(docs);
  });
});



router.get('/logout',function(req, res, next){
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;

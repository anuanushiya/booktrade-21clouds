/**
 * Created by RizqyFahmi on 16/03/2016.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
    if((req.session.username!=undefined) && (req.session.password!=undefined)){
        console.log('Login Post');
        User.findOne({_id:req.session._id},function(err, docs){
            res.render('dashboard', { username:docs.username });
        });
    }else{
        res.redirect('/');
    }
});

module.exports = router;

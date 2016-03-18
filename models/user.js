/**
 * Created by RizqyFahmi on 16/03/2016.
 */
var mongoose = require('mongoose');
var db = require('./connection');
var Schema = db.Schema;

// create a schema
var userSchema = new Schema({
    username:{ type: String, default: '-' },
    password:{ type: String, default: '-' },
    email:{ type: String, default: '-' },
    phone:{ type: String, default: '-' },
    city:{ type: String, default: '-' },
    state:{ type: String, default: '-' }
});

// the schema is useless so far
// we need to create a model using it
var user = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = user;
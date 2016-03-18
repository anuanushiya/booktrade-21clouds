/**
 * Created by RizqyFahmi on 16/03/2016.
 */
var mongoose = require('mongoose');
var db = require('./connection');
var Schema = db.Schema;

// create a schema
var bookSchema = new Schema({
    _id: String,
    title: String,
    link: String,
    authors: [{
        type: String
    }],
    thumbnail : String,
    //subscribers:[{
    //    type: mongoose.Schema.Types.ObjectId, ref: 'User'
    //}]
    subscriber:String
});

// the schema is useless so far
// we need to create a model using it
var user = mongoose.model('Book', bookSchema);

// make this available to our users in our Node applications
module.exports = user;
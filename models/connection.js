/**
 * Created by RizqyFahmi on 16/03/2016.
 */
var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/booktrade';

mongoose.connect(mongoUri, function (err) {
    if (err) {
        return console.log('Cannot connect to database', err);
    }
    // of course your can have a better db connection error handler
    return console.log('Database connected.');
});

module.exports = mongoose;
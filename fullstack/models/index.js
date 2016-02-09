var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

// models
require('./admin.js');
require('./user.js');
require('./quest.js');

exports.Admin = mongoose.model('Admin');
exports.User = mongoose.model('User');
exports.Quest = mongoose.model('Quest');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
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
require('./answ.js');
require('./comnt.js');
require('./vote.js');

exports.Admin = mongoose.model('Admin');
exports.User = mongoose.model('User');
exports.Quest = mongoose.model('Quest');
exports.Answ = mongoose.model('Answ');
exports.Comnt = mongoose.model('Comnt');
exports.Vote = mongoose.model('Vote');
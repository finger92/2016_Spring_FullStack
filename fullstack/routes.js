var express = require('express');
var sign = require('./routes/sign');
var adminRoute = require('./routes/adminRoute');
var app = express();

module.exports = function(app) {
    // admin
    app.post('/admin', adminRoute.createAdmin);
    
    // root
    app.get('/', function(req, res) {
        res.render('index',{ title: 'Express' });
    });
}
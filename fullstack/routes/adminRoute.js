var Admin = require('../models').Admin;
var validator = require('validator');
var Results = require('./commonResult');
var tools = require('../common/tools');
var md5 = require('MD5');
var EventProxy = require('eventproxy');
var flash = require('connect-flash'),
    express = require('express'),
    passport = require('passport'),
    util = require('util'),
    LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var adminRoute = require('./adminRoute');
var mongoose = require('mongoose');
var mongo_db = 'mongodb://localhost/FullStack';

exports.createAdmin = function(req, res, next) {
    var admin = new Admin();
    admin.email = req.body.email;

    var validator = require("email-validator");
    if (!validator.validate(admin.email)) {
        return res.json(Results.ERR_DATAFORMAT_ERR);
    }
    admin.password = req.body.password;
    var randomstring = require("randomstring");
    if (tools.isEmpty(admin.email) || tools.isEmpty(admin.password)) {
        return res.json(Results.ERR_PARAM_ERR);
    }
    admin.password = md5(admin.password);
    var ep = new EventProxy();
    ep.all('checkEmail', function() {
        admin.save(function(err, admin) {
            if (err) {
                console.log(err);
                return next();
            } else
                res.json({
                    result: true,
                    id: admin.id
                });
        });
    });
    ep.fail(function(err) {
        res.json({
            result: false,
            err: err
        });
    });
    Admin.findOne({
        email: admin.email
    }, function(err, item) {
        if (item != null) {
            ep.emit("error", 'ERR_EXISTED_EMAIL ');
        } else {
            ep.emit('checkEmail');
        }
    });
};

exports.isAdmin = function(userEmail, callback) {
    //check if admins collections contains userEmail
    var result = null;
    Admin.findOne({
        email: userEmail
    }, function(err, item) {
        if (item != null) {
            result = true;
        } else {
            result = false;
        }
        callback(result);
    });
};
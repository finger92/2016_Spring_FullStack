var flash = require('connect-flash'),
    express = require('express'),
    passport = require('passport'),
    util = require('util'),
    LocalStrategy = require('passport-local').Strategy;
var validator = require('validator');
var EventProxy = require('eventproxy');
var tools = require('../common/tools');
var Results = require('./commonResult');
var User = require('../models').User;
var adminRoute = require('./adminRoute');
var fs = require('fs');
var md5 = require('MD5');
var Library = require('../common/library.js');

/**
 * user login
 */
exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.jsonp({
                result: false,
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            return res.json({
                id: user.id,
                result: true
            });

        });
    })(req, res, next);
};

/**
 * user register
 */
exports.createUser = function(req, res, next) {
    
    var user = new User();
    user.email = req.body.email.toLowerCase();

    var validator = require("email-validator");
    if (!validator.validate(user.email)) {
        return res.json(Results.ERR_DATAFORMAT_ERR);
    }

    user.username = req.body.username;
    user.password = req.body.password;

    if (tools.isEmpty(user.email) || tools.isEmpty(user.password) || tools.isEmpty(user.username)) {
        return res.json(Results.ERR_PARAM_ERR);
    }

    user.password = md5(user.password);

    var ep = new EventProxy();
    ep.all('success', function() {

        user.save(function(err, user) {

            if (err) {
                console.log(err);
                return next();
            } else {
                res.json({
                    result: true,
                    id: user.id
                }); 
                return;
            }
            
        });
    });

    ep.fail(function(err) {
        res.json({
            result: false,
            err: err
        });
    });

    User.findOne({
        email: user.email
    }, function(err, user) {
        if (user != null) {
            ep.emit("error", 'ERR_EXISTED_EMAIL ');
        } else {
            ep.emit('success');
        }
    });
};

/**
 * get userself info
 */
exports.getSelf = function(req, res, next) {
    var userId = req.user.id;
    if (userId) {
        User.findById(userId,
            function(err, user) {
                if (err) {
                    res.json(Results.ERR_DB_ERR);
                    return;
                } else if (user == null) {
                    res.json(Results.ERR_NOTFOUND_ERR);
                    return;
                } else {
                    res.json({
                        result: true,
                        data: {
                            id: user.id,
                            //email: user.email,
                            username: user.username,
                            email: user.email,
                            experience: user.experience,
                            level: user.level,
                            create_time: user.create_time
                        }
                    });
                    return;
                }
            });
    } else {
        res.json(Results.ERR_REQUIRELOGIN_ERR);
        return;
    }
};

/**
 * add user's experience
 * upgrade level if needed
 */
exports.addExp = function(req, res, next) {
    var epUser = new EventProxy();

    if (!tools.isNum(req.param('exp'))) {
        return res.json(Results.ERR_PARAM_ERR);
    }
    
    epUser.all("findUser", function(user) {
        user = Library.addUserExp(user, req.param('exp'));
        user.save(function(err, user) {

            if (err) {
                console.log(err);
                return next();
            } else {

                res.json({
                    result: true,
                    exp: user.experience,
                    level: user.level
                });
                return;
            }
        });
    });
    
    User.findById(req.param("u_id"),
        function(err, user) {
            if (err) {
                res.json(Results.ERR_DB_ERR);
                return;
            } else if (user == null) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {
                epUser.emit("findUser", user);
            }
        });
};

/**
 * change user's password
 */
exports.changePwd = function(req, res, next) {
    var epUser = new EventProxy();
    
    if(tools.isEmpty(req.param('password'))){
        res.json(Results.ERR_PARAM_ERR);
        return;  
    }

    epUser.all("findUser", function(user) {
        user.password = md5(req.param('password'));
        user.save(function(err, user) {

            if (err) {
                console.log(err);
                return next();
            } else {

                res.json({
                    result: true,
                });

            }
        });
    });
    
    User.findById(req.user.id,
        function(err, user) {
            if (err) {
                res.json(Results.ERR_DB_ERR);
                return;
            } else if (user == null) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {
                epUser.emit("findUser", user);
            }
        });
};

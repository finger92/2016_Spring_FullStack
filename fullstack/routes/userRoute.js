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

var passport = require('passport');

var md5 = require('MD5');
var exp_plevel = 5;

exports.test = function(req, res, next) {
    res.json(Results.ERR_DB_ERR);
};

/**
 * ensure operation happend after user login
 */
exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({
        result: false,
        err: 'ERR_NOT_ALLOWED'
    });

};

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
            //return res.redirect('/m_login_failure?callback='+req.body.callback);
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            var user = {};
            user.id = req.user._id;
            user.username = req.user.username;

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
    }, function(err, item) {
        if (item != null) {
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
 * upgrage level if needed
 */
exports.addExp = function(req, res, next) {
    var epUser = new EventProxy();

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

    epUser.all("findUser", function(user) {

        var exp = req.param('exp');
        var pre_exp = user.experience
        user.experience = (pre_exp + exp) % exp_plevel;
        user.level += parseInt((pre_exp + exp) / exp_plevel);
        
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

            }
        });
    });

};


/**
 * add user's experience
 * upgrage level if needed
 */
exports.addExp = function(req, res, next) {
    var epUser = new EventProxy();

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

    epUser.all("findUser", function(user) {

        var exp = req.param('exp');
        var pre_exp = user.experience
        user.experience = (pre_exp + exp) % exp_plevel;
        user.level += parseInt((pre_exp + exp) / exp_plevel);
        
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

            }
        });
    });

};

/**
 * change user's password
 */
exports.changePwd = function(req, res, next) {
    var epUser = new EventProxy();

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

};

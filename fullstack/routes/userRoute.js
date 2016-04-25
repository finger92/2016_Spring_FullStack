var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var userDao = require('../dao/userDao.js');
var validator = require('validator');
var EventProxy = require('eventproxy');
var tools = require('../common/tools');
var Results = require('./commonResult');
var User = require('../models').User;
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
                username: user.username,
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
        userDao.save (user).then(
            function(user) {
                res.json({
                    result: true,
                    id: user.id
                });
            }
        ).catch(
            function(err) {
                res.json(Results.ERR_DB_ERR);
                console.log(err);
                return;
            }
        );
    });

    userDao.findByEmail(user.email).then(
        function(user) {
            if(user == null){
                ep.emit('success');
            }else{
                res.json(Results.ERR_EXISTED_EMAIL);
            }
        }
    ).catch(
        function(err) {
            res.json(Results.ERR_DB_ERR);
            console.log(err);
            return;
        }
    );
};

/**
 * get userself info
 */
exports.getSelf = function(req, res, next) {
    var userId = req.user.id;
    if (userId) {
        userDao.findById(userId).then(
            function(user){
                if(user == null){
                    res.json(Results.ERR_NOTFOUND_ERR);
                    return;
                }else{
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
            }
        ).catch(
            function(err){
                res.json(Results.ERR_DB_ERR);
                console.log(err);
                return;
            }
        );
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
    var exp = req.param('exp');
    if (!tools.isNum(exp) ){
        return res.json(Results.ERR_PARAM_ERR);
    }
    
    epUser.all("findUser", function(user) {
        user = Library.addUserExp(user, parseInt(exp));
        userDao.save(user) .then(
            function(result) {
                res.json({
                    result: true,
                    exp: user.experience,
                    level: user.level
                });
                return;
            }
        ).catch(
            function(err) {
                res.json(Results.ERR_DB_ERR);
                console.log(err);
                return;
            }
        );
    });
    
    userDao.findById(req.param("u_id")).then(
        function(user){
            if (user == null) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {
                epUser.emit("findUser", user);
            }
        }
    ).catch(
        function(err){
            res.json(Results.ERR_DB_ERR);
            console.log(err);
            return;
        }
    );
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
        userDao.save(user) .then(
            function(result) {
                res.json({
                    result: true,
                });
                return;
            }
        ).catch(
            function(err) {
                res.json(Results.ERR_DB_ERR);
                console.log(err);
                return;
            }
        );
    });
    
    userDao.findById(req.user.id).then(
        function(user){
            if (user == null) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {
                epUser.emit("findUser", user);
            }
        }
    ).catch(
        function(err){
            res.json(Results.ERR_DB_ERR);
            console.log(err);
            return;
        }
    );
};

exports.getTopUsers = function(req, res, next){
    userDao.getTopUsers().then(
         function(users){
            if (!users.length) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {    
                res.json({
                    result: true,
                    data: users
                });
                return;
            }
        }
    ).catch(
        function(err){
            res.json(Results.ERR_DB_ERR);
            console.log(err);
            return;
        }
    );    
}

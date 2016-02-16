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
var Answ = require('../models').Answ;
var Quest = require('../models').Quest;
var Comnt = require('../models').Comnt;
var adminRoute = require('./adminRoute');
var fs = require('fs');
var Library = require('../common/library.js');

/**
 * post answer 
 */
exports.postComnt = function(req, res, next) {
    var ep = new EventProxy();
    var userId = req.user.id;
    var answ_id = req.param('answ_id');
    
    if (userId) {
        if(tools.isEmpty(req.param('content'))){
            res.json(Results.ERR_PARAM_ERR);
            return;
        }
        ep.emit('post_comnt');
    } else {
        ep.emit("error", 'ERR_REQUIRELOGIN_ERR');
    }
    
    ep.all('post_comnt', function() {
        User.findById(userId,
            function(err, comnt) {
                if (err) {
                    ep.emit("error", 'ERR_DB_ERR');
                } else if (comnt == null) {
                    ep.emit("error", 'ERR_NOTFOUND_ERR');
                } else {
                    var comnt = new Comnt();
                    comnt.answ_id = answ_id;
                    comnt.content = req.param('content');
                    comnt.u_id = userId;
                    comnt.u_name = user.username;
                    comnt.u_level = user.level;
                    comnt.save(function(err, comnt) {
                        if (err) {
                            console.log(err);
                            return next();
                        } else {
                            res.json({
                                result: true
                            });
                            return;
                        }
                    });
                };
            });
    });
    
    ep.fail(function(err) {
        res.json({
            result: false,
            err: err
        });
    });
};

/**
 * get answer list
 */
exports.getComntList = function(req, res, next) {

    var answ_id = req.param('answ_id');
    Comnt.find({answ_id:answ_id}, 'id content u_name u_level create_time')
        .sort({
            create_time: 'desc'
        }).exec(function(err, comnt) {
            if (err) {
                res.json(Results.ERR_DB_ERR);
                return;
            } else if (!comnt.length) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {    
                res.json({
                    result: true,
                    data: comnt
                });
                return;
            }
        })
};

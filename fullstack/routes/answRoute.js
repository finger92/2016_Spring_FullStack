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
var NotiCenter = require('../models').NotiCenter;
var adminRoute = require('./adminRoute');
var fs = require('fs');
var Library = require('../common/library.js');

/**
 * post answer 
 */
exports.postAnsw = function(req, res, next) {
    var ep = new EventProxy();
    var userId = req.user.id;
    var quest_id = req.param('quest_id');
    var notiCenter = new NotiCenter();
    
    if (userId) {
        ep.emit('post_answer');
    } else {
        ep.emit("error", 'ERR_REQUIRELOGIN_ERR');
    }
    
    ep.all('post_answer', function() {
        User.findById(userId,
            function(err, user) {
                if (err) {
                    ep.emit("error", 'ERR_DB_ERR');
                } else if (user == null) {
                    ep.emit("error", 'ERR_NOTFOUND_ERR');
                } else {
                    var answ = new Answ();
                    answ.quest_id = quest_id;
                    answ.content = req.param('content');
                    answ.u_name = user.username;
                    answ.u_level = user.level;
                    answ.save(function(err, answ) {
                        if (err) {
                            console.log(err);
                            return next();
                        } else {
                            ep.emit("change_last_action");
                        }
                    });
                };
            });
    });
    
    
    ep.all('change_last_action', function() {
        Quest.findById(quest_id,
            function(err, quest) {
                if (err) {
                    ep.emit("error", 'ERR_DB_ERR');
                } else if (quest == null) {
                    ep.emit("error", 'ERR_NOTFOUND_ERR');
                } else {
                    quest.last_act = 'Answered';
                    quest.last_act_time = Date.now;
                    notiCenter.quest_title = quest.title;
                    answ.save(function(err, answ) {
                        if (err) {
                            console.log(err);
                            return next();
                        } else {
                            ep.emit("add_notify");  
                        }
                    });
                };
            });
    });
    
    ep.all('add_notify', function() {
        notiCenter.u_id = userId;
        notiCenter.quest_id = quest_id;
        notiCenter.save(function(err, noti) {
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
exports.getAnswList = function(req, res, next) {

    var quest_id = req.param('quest_id');
    Answ.find({quest_id:quest_id}, 'id content u_name u_level vote create_time')
        .sort({
            vote: 'desc'
        }).exec(function(err, answs) {
            if (err) {
                res.json(Results.ERR_DB_ERR);
                return;
            } else if (!answs.length) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {    
                res.json({
                    result: true,
                    data: answs
                });
                return;
            }
        })
};

/**
 * add new vote
 */
exports.voteAnsw = function(req, res, next) {
    
    var userId = req.user.id;
    if (userId) {
        Answ.findById(req.param('id'),
            function(err, answ) {
                if (err) {
                    res.json(Results.ERR_DB_ERR);
                    return;
                } else if (answ == null) {
                    res.json(Results.ERR_NOTFOUND_ERR);
                    return;
                } else {
                    answ.vote = Library.addVote(answ.vote, answ.vote_num, req.param('vote'));
                    answ.vote_num = Library.addNum(answ.vote_num, 1);
                    answ.save(function(err, quest) {
                        if (err) {
                            console.log(err);
                            return next();
                        } else {

                            res.json({
                                result: true
                            });

                        }
                    });
                    return;
                };
            });
    } else {
        res.json(Results.ERR_REQUIRELOGIN_ERR);
        return;
    }

};

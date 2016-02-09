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
var Quest = require('../models').Quest;
var adminRoute = require('./adminRoute');
var fs = require('fs');

/**
 * post question 
 */
exports.postQuest = function(req, res, next) {
    
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
                    var quest = new Quest();
                    quest.title = req.param('title');
                    quest.content = req.param('content');
                    quest.u_name = user.username;
                    quest.u_level = user.level;
                    quest.save(function(err, quest) {
                        if (err) {
                            console.log(err);
                            return next();
                        } else {
                            res.json({
                                result: true,
                                id: quest.id
                            });
                        }
                    });
                };
            });
    } else {
        res.json(Results.ERR_REQUIRELOGIN_ERR);
        return;
    }
};

/**
 * get questions list
 */
exports.getQuestList = function(req, res, next) {

    Quest.find({}, 'id title content u_name u_level answ_num view_num create_time')
        .sort({
            create_time: 'desc'
        }).exec(function(err, quests) {
            if (err) {
                res.json(Results.ERR_DB_ERR);
                return;
            } else if (!quests.length) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {
                res.json({
                    result: true,
                    data: quests
                });
                return;
            }
        })
};

/**
 * make viewer number plus 1 
 */
exports.addViewerNum = function(req, res, next) {
    var epQuest = new EventProxy();

    Quest.findById(req.param('id'),
        function(err, quest) {
            if (err) {
                res.json(Results.ERR_DB_ERR);
                return;
            } else if (quest == null) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {
                epQuest.emit("findQuest", quest);
            }
        });

    epQuest.all("findQuest", function(quest) {

        quest.view_num += 1;
        quest.save(function(err, quest) {

            if (err) {
                console.log(err);
                return next();
            } else {

                res.json({
                    result: true
                });

            }
        });
    });

};

/**
 * make answer number plus 1 
 */
exports.addAnswerNum = function(req, res, next) {
    var epQuest = new EventProxy();

    Quest.findById(req.param('id'),
        function(err, quest) {
            if (err) {
                res.json(Results.ERR_DB_ERR);
                return;
            } else if (quest == null) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {
                epQuest.emit("findQuest", quest);
            }
        });

    epQuest.all("findQuest", function(quest) {

        quest.answ_num += 1;
        quest.save(function(err, quest) {

            if (err) {
                console.log(err);
                return next();
            } else {

                res.json({
                    result: true
                });

            }
        });
    });

};
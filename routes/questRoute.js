var EventProxy = require('eventproxy');
var tools = require('../common/tools');
var Results = require('./commonResult');
var Quest = require('../models').Quest;
var questDao = require('../dao/questDao.js');
var Library = require('../common/library.js');

/**
 * post question 
 */
exports.postQuest = function(req, res, next) {
    var user = req.user;
    if (user.id) {
        if(tools.isEmpty(req.param('title')) || tools.isEmpty(req.param('content'))){
            res.json(Results.ERR_PARAM_ERR);
            return;
        }
        
        var quest = new Quest();
        quest.title = req.param('title');
        quest.content = req.param('content');
        quest.u_id = user.id;
        questDao.save(quest).then(
             function(quest){
                res.json({
                    result: true,
                    id: quest.id
                });
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
 * get questions list
 */
exports.getQuestList = function(req, res, next) {
    questDao.findAll().then(
         function(quests){
            if (!quests.length) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {    
                res.json({
                    result: true,
                    data: quests
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
};

/**
 * get question by question id
 */
exports.getQuestById = function(req, res, next) {
    questDao.findById(req.param('quest_id')).then(
         function(quest){
            if (quest == null) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {
                res.json({
                    result: true,
                    data: quest
                });
                return;
            };
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
 * get questions list by user id
 */
exports.getQuestByUserId = function(req, res, next) {
    questDao.findByUserId(req.param('u_id')).then(
         function(quests){
            if (!quests.length) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {    
                res.json({
                    result: true,
                    data: quests
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
};

/**
 * get hot questions list
 */
exports.getHotQuestList = function(req, res, next) {
    questDao.findHot().then(
         function(quests){
            if (!quests.length) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {    
                res.json({
                    result: true,
                    data: quests
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
};

/**
 * make viewer number plus 1 
 */
exports.addViewerNum = function(req, res, next) {
    var epQuest = new EventProxy();

    epQuest.all("findQuest", function(quest) {
        quest.view_num = Library.addNum(quest.view_num, 1);
        questDao.save(quest).then(
             function(quest){
                res.json({
                    result: true
                });
             }
        ).catch(
            function(err){
                res.json(Results.ERR_DB_ERR);
                console.log(err);
                return;
            }
        );
    });

    questDao.findById(req.param('quest_id')).then(
         function(quest){
            if (quest == null) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {
                epQuest.emit("findQuest", quest);
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

 
        
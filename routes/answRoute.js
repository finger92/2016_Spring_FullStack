var EventProxy = require('eventproxy');
var tools = require('../common/tools');
var Results = require('./commonResult');
var Answ = require('../models').Answ;
var Vote = require('../models').Vote;
var answDao = require('../dao/answDao.js');
var questDao = require('../dao/questDao.js');
var voteDao = require('../dao/voteDao.js');
var Library = require('../common/library.js');

/**
 * post answer 
 */
exports.postAnsw = function(req, res, next) {
    var ep = new EventProxy();
    var user = req.user;
    var quest_id = req.param('quest_id');
    
    ep.all('changeLastAction', function() {
        questDao.findById(req.param('quest_id')).then(
             function(quest){
                if (quest == null) {
                    res.json(Results.ERR_NOTFOUND_ERR);
                    return;
                } else {
                    quest.last_act_time = new Date();
                    quest.answ_num = Library.addNum(quest.answ_num, 1);
                    questDao.save(quest).then(
                         function(quest){
                            res.json({
                                result: true
                            });
                            return; 
                         }
                    ).catch(
                        function(err){
                            res.json(Results.ERR_DB_ERR);
                            console.log(err);
                            return;
                        }
                    );
                };
             }
        ).catch(
            function(err){
                res.json(Results.ERR_DB_ERR);
                console.log(err);
                return;
            }
        );
    });

    ep.all("postAnswer", function() {
        var answ = new Answ();
        answ.quest_id = quest_id;
        answ.content = req.param('content');
        answ.u_id = user.id;
        answ.u_name = user.username;
        answ.u_level = user.level;
        answDao.save(answ).then(
             function(answ){
                ep.emit("changeLastAction");
             }
        ).catch(
            function(err){
                res.json(Results.ERR_DB_ERR);
                console.log(err);
                return;
            }
        );
    });
    
    if (user.id) {
        if(tools.isEmpty(req.param('content')) || tools.isEmpty(quest_id)){
            res.json(Results.ERR_PARAM_ERR);
            return;
        }
        ep.emit("postAnswer");
    } else {
        res.json(Results.ERR_REQUIRELOGIN_ERR);
        return;
    }
};

/**
 * get answer list
 */
exports.getAnswList = function(req, res, next) {
    var quest_id = req.param('quest_id');
    if(tools.isEmpty(quest_id)){
        res.json(Results.ERR_PARAM_ERR);
        return;
    }
    answDao.findByQuestId(quest_id).then(
         function(answs){
            if (!answs.length) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {    
                res.json({
                    result: true,
                    data: Library.rankAnswList(answs)
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
 * add new vote
 */
exports.voteAnsw = function(req, res, next) {
    var ep = new EventProxy();
    var user = req.user;
    var answ_id = req.param('answ_id');
    var voteStar = req.param('vote');
    ep.all('postVote',function(){
        answDao.findById(answ_id).then(
            function(answ) {
                if (answ == null) {
                    res.json(Results.ERR_NOTFOUND_ERR);
                    return;
                } else {
                    answ.vote = Library.addVote(answ.vote, answ.vote_num, parseInt(voteStar));
                    answ.vote_num = Library.addNum(answ.vote_num, 1);
                    answDao.save(answ).then(
                         function(answ){
                            var vote = new Vote();
                            vote.u_id = user.id;
                            vote.answ_id = answ.id;
                            voteDao.save(vote);
                            res.json({
                                result: true,
                                vote: answ.vote
                            });
                         }
                    ).catch(
                        function(err){
                            res.json(Results.ERR_DB_ERR);
                            console.log(err);
                            return;
                        }
                    );
                };
            }
        ).catch(
            function(err) {
                res.json(Results.ERR_DB_ERR);
                console.log(err);
                return;
            }
        );
    });

    if (user.id) {
        if(tools.isEmpty(answ_id) || !tools.isNum(voteStar)){
            res.json(Results.ERR_PARAM_ERR);
            return;
        }
        voteDao.findByUserId(user.id).then(
            function(votes){
                if(Library.checkVote(votes, answ_id)){
                    ep.emit("postVote");
                }else{
                    res.json(Results.ERR_ALREADY_VOTED);
                    return;
                }
            }
        ).catch(
            function(err) {
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

var EventProxy = require('eventproxy');
var tools = require('../common/tools');
var Results = require('./commonResult');
var Comnt = require('../models').Comnt;
var comntDao = require('../dao/comntDao.js');

/**
 * post comment 
 */
exports.postComnt = function(req, res, next) {
    var ep = new EventProxy();
    var user = req.user;
    var answ_id = req.param('answ_id');
    
    ep.all('postComnt', function() {
        var comnt = new Comnt();
        comnt.answ_id = answ_id;
        comnt.content = req.param('content');
        comnt.u_id = user.id;
        comnt.u_name = user.username;
        comnt.u_level = user.level;
        comntDao.save(comnt).then(
             function(comnt){
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
    });
    
    if (user.id) {
        if(tools.isEmpty(req.param('content')) || tools.isEmpty(answ_id)){
            res.json(Results.ERR_PARAM_ERR);
            return;
        }
        ep.emit('postComnt');
    } else {
        res.json(Results.ERR_REQUIRELOGIN_ERR);
        return;
    }
};

/**
 * get comment list
 */
exports.getComntList = function(req, res, next) {
    var answ_id = req.param('answ_id');
    comntDao.findByAnswId(answ_id).then(
         function(comnts){
            if (!comnts.length) {
                res.json(Results.ERR_NOTFOUND_ERR);
                return;
            } else {    
                res.json({
                    result: true,
                    data: comnts
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

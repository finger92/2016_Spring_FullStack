var Vote = require('../models').Vote;

exports.save = function(vote){
    return vote.save();
}

exports.findByUserId = function(u_id){
    return  Vote.find({u_id:u_id},'answ_id').exec();
}




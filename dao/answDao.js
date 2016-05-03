var Answ = require('../models').Answ;

exports.save = function(answ){
    return answ.save();
}

exports.findById = function(id){
    return  Answ.findById(id).populate('u_id','username level').exec();
}

exports.findByQuestId = function(quest_id){
    return  Answ.find({quest_id:quest_id}, 'id content u_id vote create_time').populate('u_id','username level').exec();
}



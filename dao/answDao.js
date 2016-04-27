var Answ = require('../models').Answ;

exports.save = function(answ){
    return answ.save();
}

exports.findById = function(id){
    return  Answ.findById(id).exec();
}

exports.findByQuestId = function(quest_id){
    return  Answ.find({quest_id:quest_id}, 'id content u_name u_level vote create_time').exec();
}


